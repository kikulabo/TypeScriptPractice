## 注意

このノートは生成AIによって作成されたものです。内容が正しいものかどうかは保証できませんので、必ず自分で確認してください。

**AWS CDK ハンズオン：基礎から実践的な構成管理まで (全7ステップ)**

**はじめに**

このハンズオンでは、AWS Cloud Development Kit (CDK) を使用して、単一のリソース作成から始め、段階的に Construct のレベル (L1/L2/L3)、ディレクトリ構成、複数スタック、複数環境/アカウントの管理といった、より実践的なトピックまでを7つのステップで学びます。

**前提条件と基本操作**

ハンズオンを開始する前に、以下の準備と基本的なCDKコマンドの理解が必要です。

1.  **AWS アカウント:** 有効なAWSアカウントが必要です。
2.  **AWS CLI:** AWS CLIがインストールされ、`aws configure` コマンドでデプロイ対象アカウントのアクセスキー、シークレットキー、デフォルトリージョン、出力形式が設定済みであること。
3.  **Node.js と npm:** Node.js (LTS版推奨) と npm (Node.jsに同梱) がインストールされていること。
4.  **AWS CDK Toolkit:** ターミナルで `npm install -g aws-cdk` を実行してインストールします。`cdk --version` でバージョンを確認できます。
5.  **CDKブートストラップ:** CDKはデプロイに必要なリソース（S3バケットなど）を管理するため、初めてCDKを使うAWSアカウントとリージョンの組み合わせに対して、`cdk bootstrap aws://ACCOUNT-ID/REGION` コマンドを実行する必要があります。（例: `cdk bootstrap aws://111111111111/ap-northeast-1`）

**基本的なCDKコマンド:**

* `cdk init app --language typescript`: 新しいCDKプロジェクトを初期化します。
* `cdk synth`: CDKコードをCloudFormationテンプレートに合成（変換）します。
* `cdk deploy [StackName]`: 指定したスタック（または全てのスタック）をデプロイします。変更内容の確認が表示されます。
* `cdk diff [StackName]`: 現在のデプロイ済みスタックとローカルコードとの差分を表示します。
* `cdk destroy [StackName]`: 指定したスタック（または全てのスタック）を削除します。

**ハンズオン開始**

**ステップ1: プロジェクト初期化と L2 Construct による S3 バケット作成**

まず、プロジェクトを初期化し、最も一般的な L2 Construct を使って基本的なリソースを作成します。L2 Construct はAWSリソースを扱いやすく抽象化したクラスです。

1.  作業ディレクトリを作成し、移動します: `mkdir advanced-cdk-app && cd advanced-cdk-app`
2.  プロジェクトを初期化します: `cdk init app --language typescript`
3.  `lib/advanced-cdk-app-stack.ts` を開き、以下のように編集してS3バケットを追加します。
    ```typescript
    import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
    import { Construct } from 'constructs';
    import * as s3 from 'aws-cdk-lib/aws-s3'; // L2 Construct for S3

    export class AdvancedCdkAppStack extends Stack {
      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // L2 Construct を使用して S3 バケットを作成
        new s3.Bucket(this, 'MyL2Bucket', {
          // L2ではプロパティで簡単に設定可能
          versioned: true, // バージョニング有効化
          removalPolicy: RemovalPolicy.DESTROY, // スタック削除時にバケットも削除 (空である必要あり)
          autoDeleteObjects: true, // スタック削除時にオブジェクトも自動削除 (注意して使用)
        });
      }
    }
    ```
4.  デプロイします: `cdk deploy` (確認画面で `y` を入力)
5.  AWSコンソールでS3バケットが作成され、バージョニングが有効になっていることを確認します。

**ステップ2: L1 Construct の利用**

次に、L2 Construct では直接設定できない細かい設定や、CloudFormationのレベルで直接リソースを定義したい場合に使用する L1 Construct を試します。L1 Construct は CloudFormation リソースタイプに直接対応します (`CfnXXX`)。

1.  `lib/advanced-cdk-app-stack.ts` を編集し、L1 Construct を使って別のS3バケットを追加します。
    ```typescript
    import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib'; // CfnOutput を追加
    import { Construct } from 'constructs';
    import * as s3 from 'aws-cdk-lib/aws-s3';

    export class AdvancedCdkAppStack extends Stack {
      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // L2 Construct (ステップ1で作成)
        const l2Bucket = new s3.Bucket(this, 'MyL2Bucket', {
          versioned: true,
          removalPolicy: RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });

        // --- ここから追加 ---
        // L1 Construct を使用して S3 バケットを作成
        const l1Bucket = new s3.CfnBucket(this, 'MyL1Bucket', {
          // CloudFormationのプロパティ名を直接スネークケース or キャメルケースで指定
          bucketName: `my-l1-bucket-${this.account}-${this.region}`, // バケット名を明示的に指定 (グローバルに一意にする必要あり)
          tags: [{ key: 'ConstructLevel', value: 'L1' }],
          versioningConfiguration: { // L1では詳細な設定が必要
            status: 'Enabled',
          },
          // L1 Constructには RemovalPolicy のような便利な抽象化はない
        });

        // L1バケットの名前を出力
        new CfnOutput(this, 'L1BucketNameOutput', {
          value: l1Bucket.ref, // CfnBucketの参照 (バケット名)
          description: 'Name of the L1 S3 bucket',
        });
        // --- ここまで追加 ---

        // L2バケットの名前も出力 (比較のため)
        new CfnOutput(this, 'L2BucketNameOutput', {
          value: l2Bucket.bucketName,
          description: 'Name of the L2 S3 bucket',
        });
      }
    }
    ```
    * L1 (`CfnBucket`) ではプロパティ名がCloudFormationに近く、より低レベルな設定が必要なことがわかります。`removalPolicy` のような高レベルな抽象化は提供されません。
2.  差分を確認します: `cdk diff`
3.  デプロイします: `cdk deploy`
4.  AWSコンソールで、明示的に指定した名前 (`my-l1-bucket-...`) のバケットと、`ConstructLevel: L1` タグが付与されていることを確認します。CloudFormationの出力タブでバケット名が表示されていることも確認します。

**ステップ3: L3 Construct (カスタムパターン) の作成と利用**

よく利用するリソースの組み合わせや、独自のデフォルト設定を持つリソースをカプセル化する L3 Construct (カスタム Construct) を作成します。これにより、コードの再利用性と保守性が向上します。

1.  `lib` ディレクトリ内に新しいファイル `my-custom-constructs.ts` を作成し、以下のように編集します。
    ```typescript
    import { Construct } from 'constructs';
    import * as s3 from 'aws-cdk-lib/aws-s3';
    import { RemovalPolicy, Tags } from 'aws-cdk-lib';

    export interface MySecureBucketProps extends s3.BucketProps {
      // 必要であればカスタムプロパティを追加
      customTagName?: string;
    }

    // Construct を継承したカスタムクラス
    export class MySecureBucket extends Construct {
      public readonly bucket: s3.Bucket;

      constructor(scope: Construct, id: string, props: MySecureBucketProps) {
        super(scope, id);

        this.bucket = new s3.Bucket(this, 'SecureBucketResource', {
          ...props, // 渡されたプロパティを展開
          // --- ここで独自のデフォルトや強制設定を追加 ---
          encryption: s3.BucketEncryption.S3_MANAGED, // 暗号化を強制
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // パブリックアクセスをブロック
          versioned: true, // バージョニングをデフォルトで有効
          removalPolicy: props.removalPolicy ?? RemovalPolicy.RETAIN, // 指定がなければ RETAIN
          autoDeleteObjects: props.autoDeleteObjects ?? false, // 指定がなければ false
        });

        // 必須タグを追加
        Tags.of(this).add('Project', 'AdvancedCdkApp');
        if (props.customTagName) {
          Tags.of(this).add('CustomTag', props.customTagName);
        }
      }
    }
    ```
2.  `lib/advanced-cdk-app-stack.ts` を編集し、作成した `MySecureBucket` を利用します。
    ```typescript
    // ... (既存のimport) ...
    import { MySecureBucket } from './my-custom-constructs'; // 作成したカスタムConstructをインポート

    export class AdvancedCdkAppStack extends Stack {
      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // ... (ステップ1, 2のコード) ...

        // --- ここから追加 ---
        // L3 Construct (カスタムパターン) を使用
        const secureBucket = new MySecureBucket(this, 'MyL3SecureBucket', {
          // カスタムConstructのプロパティを指定
          customTagName: 'FinanceData',
          // L2のBucketPropsも渡せる (上書きされる設定もある)
          removalPolicy: RemovalPolicy.DESTROY, // デフォルト(RETAIN)を上書き
          autoDeleteObjects: true, // デフォルト(false)を上書き
        });

        new CfnOutput(this, 'L3BucketNameOutput', {
          value: secureBucket.bucket.bucketName, // カスタムConstruct内のbucketを参照
          description: 'Name of the L3 secure S3 bucket',
        });
        // --- ここまで追加 ---
      }
    }
    ```
3.  デプロイします: `cdk deploy`
4.  AWSコンソールで、新しいS3バケットが作成され、`MySecureBucket` で定義した暗号化、パブリックアクセスブロック、タグ (`Project`, `CustomTag`) が設定されていることを確認します。

**ステップ4: ディレクトリ構成の整理と複数スタックへの分割**

アプリケーションが複雑になるにつれて、リソースを機能ごとにスタックに分割すると管理しやすくなります。ここでは、ネットワーク関連のリソースとアプリケーション関連のリソースを別のスタックに分けます。

1.  `lib` ディレクトリ内に `network-stack.ts` と `application-stack.ts` を作成します。
2.  **`lib/network-stack.ts`** を編集します (VPCを作成する例):
    ```typescript
    import { Stack, StackProps } from 'aws-cdk-lib';
    import { Construct } from 'constructs';
    import * as ec2 from 'aws-cdk-lib/aws-ec2';

    export class NetworkStack extends Stack {
      public readonly vpc: ec2.Vpc; // 他のスタックから参照できるように public にする

      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'MyVpc', {
          maxAzs: 2, // 利用するAZ数
          natGateways: 1, // NAT Gatewayの数
        });
      }
    }
    ```
3.  **`lib/application-stack.ts`** を編集します (以前のS3バケット定義をこちらに移し、VPCを参照する例):
    ```typescript
    import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
    import { Construct } from 'constructs';
    import * as s3 from 'aws-cdk-lib/aws-s3';
    import * as ec2 from 'aws-cdk-lib/aws-ec2'; // VPCを参照するために必要
    import { MySecureBucket } from './my-custom-constructs';

    // このスタックが VPC を必要とすることを伝えるためのプロパティインターフェース
    export interface ApplicationStackProps extends StackProps {
      vpc: ec2.IVpc; // NetworkStackからVPCを受け取る
    }

    export class ApplicationStack extends Stack {
      constructor(scope: Construct, id: string, props: ApplicationStackProps) { // props を ApplicationStackProps に変更
        super(scope, id, props);

        // --- 以前の Stack の内容を移動 ---
        const l2Bucket = new s3.Bucket(this, 'MyL2Bucket', {
          versioned: true,
          removalPolicy: RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });
        // VPC 内のリソースからアクセスされることなどを想定 (ここではVPC自体は使わないが出力)
        new CfnOutput(this, 'VpcIdOutput', { value: props.vpc.vpcId });

        const l1Bucket = new s3.CfnBucket(this, 'MyL1Bucket', {
           bucketName: `my-l1-bucket-${this.account}-${this.region}`,
           tags: [{ key: 'ConstructLevel', value: 'L1' }],
           versioningConfiguration: { status: 'Enabled' },
        });
         new CfnOutput(this, 'L1BucketNameOutput', { value: l1Bucket.ref });

        const secureBucket = new MySecureBucket(this, 'MyL3SecureBucket', {
          customTagName: 'FinanceData',
          removalPolicy: RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        });
        new CfnOutput(this, 'L3BucketNameOutput', { value: secureBucket.bucket.bucketName });
        // --- ここまで移動 ---
      }
    }
    ```
4.  **`bin/advanced-cdk-app.ts`** (エントリーポイント) を編集し、両方のスタックをインスタンス化します。
    ```typescript
    #!/usr/bin/env node
    import 'source-map-support/register';
    import * as cdk from 'aws-cdk-lib';
    import { NetworkStack } from '../lib/network-stack'; // NetworkStack をインポート
    import { ApplicationStack } from '../lib/application-stack'; // ApplicationStack をインポート

    const app = new cdk.App();

    // ネットワークスタックを作成
    const networkStack = new NetworkStack(app, 'NetworkStack', {
      /* 必要であれば env などの props を指定 */
      // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
    });

    // アプリケーションスタックを作成し、NetworkStack の VPC を渡す
    new ApplicationStack(app, 'ApplicationStack', {
      vpc: networkStack.vpc, // NetworkStackのvpcプロパティを参照
      /* 必要であれば env などの props を指定 */
      // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
    });

    // (オプション) スタックにタグを追加
    cdk.Tags.of(app).add('App', 'AdvancedCdkApp');
    ```
    * `AdvancedCdkAppStack` は使わなくなったので、`lib/advanced-cdk-app-stack.ts` は削除しても構いません（または ApplicationStack のベースとして使う）。
5.  全てのスタックをデプロイします: `cdk deploy --all` (または `cdk deploy NetworkStack ApplicationStack`)
6.  AWSコンソール (CloudFormation) で `NetworkStack` と `ApplicationStack` の2つのスタックが作成され、ApplicationStack が NetworkStack の VPC ID を出力していることを確認します。

**ステップ5: 環境ごとの設定 (Context の利用)**

開発 (dev) 環境と本番 (prd) 環境で異なる設定（例: NAT Gateway の数、バケット名プレフィックスなど）を適用する方法を学びます。`cdk.json` の `context` やコマンドラインオプション (`-c`) を利用します。

1.  **`cdk.json`** ファイルを開き、`context` セクションを追加します。
    ```json
    {
      "app": "npx ts-node --prefer-ts-exts bin/advanced-cdk-app.ts",
      "context": {
        "@aws-cdk/aws-s3:autoDeleteObjects": true, // (オプション) autoDeleteを許可
        "dev": {
          "envName": "dev",
          "natGateways": 1,
          "bucketPrefix": "dev-"
        },
        "prd": {
          "envName": "prd",
          "natGateways": 2, // 本番では冗長性を高める
          "bucketPrefix": "prd-"
        }
        // ... 他の共通コンテキスト設定 ...
      }
      // ... 他の設定 ...
    }
    ```
2.  **`bin/advanced-cdk-app.ts`** を編集し、コンテキストを読み込んでスタックに渡します。
    ```typescript
    #!/usr/bin/env node
    import 'source-map-support/register';
    import * as cdk from 'aws-cdk-lib';
    import { NetworkStack } from '../lib/network-stack';
    import { ApplicationStack } from '../lib/application-stack';

    const app = new cdk.App();

    // コマンドライン (-c env=xxx) または cdk.json から環境名を取得 (デフォルトは dev)
    const envName = app.node.tryGetContext('env') || 'dev';
    // 指定された環境名に対応するコンテキスト設定を取得
    const envContext = app.node.tryGetContext(envName);
    if (!envContext) {
      throw new Error(`Context for environment "${envName}" not found in cdk.json. Please define it.`);
    }

    // 環境に応じた StackProps (env や terminationProtection など)
    const stackProps: cdk.StackProps = {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, // 環境変数から取得
        region: process.env.CDK_DEFAULT_REGION, // 環境変数から取得
      },
      terminationProtection: envName === 'prd', // 本番環境のみ削除保護を有効化
    };

    // ネットワークスタックを作成 (コンテキストからNAT数を取得)
    const networkStack = new NetworkStack(app, `NetworkStack-${envName}`, {
      ...stackProps,
      natGateways: envContext.natGateways, // コンテキストから取得
    });

    // アプリケーションスタックを作成 (VPCとプレフィックスを渡す)
    const appStack = new ApplicationStack(app, `ApplicationStack-${envName}`, {
      ...stackProps,
      vpc: networkStack.vpc,
      bucketPrefix: envContext.bucketPrefix, // コンテキストから取得
    });

    cdk.Tags.of(app).add('Environment', envName);
    cdk.Tags.of(app).add('App', 'AdvancedCdkApp');
    ```
3.  `lib/network-stack.ts` と `lib/application-stack.ts` の `constructor` を変更して、コンテキストから渡された値を使えるようにします。
    * **`lib/network-stack.ts`**:
        ```typescript
        // ... imports ...
        export interface NetworkStackProps extends StackProps {
          natGateways: number; // コンテキストから受け取る
        }
        export class NetworkStack extends Stack {
          public readonly vpc: ec2.Vpc;
          constructor(scope: Construct, id: string, props: NetworkStackProps) { // props型を変更
            super(scope, id, props);
            this.vpc = new ec2.Vpc(this, 'MyVpc', {
              maxAzs: 2,
              natGateways: props.natGateways, // propsから使用
            });
          }
        }
        ```
    * **`lib/application-stack.ts`**: バケット名のプレフィックスを変更します。
        ```typescript
        // ... imports ...
        export interface ApplicationStackProps extends StackProps {
          vpc: ec2.IVpc;
          bucketPrefix: string; // コンテキストから受け取る
        }
        export class ApplicationStack extends Stack {
          constructor(scope: Construct, id: string, props: ApplicationStackProps) {
            super(scope, id, props);
            const prefix = props.bucketPrefix; // プレフィックスを取得

            // L1 バケット名を変更
            const l1Bucket = new s3.CfnBucket(this, 'MyL1Bucket', {
               bucketName: `${prefix}my-l1-bucket-${this.account}-${this.region}`, // プレフィックスを適用
               // ... rest of L1 props ...
            });
            // L2, L3 バケットはCDKが名前を生成するためプレフィックスの影響は限定的だが、
            // 必要なら L2/L3 の中で bucketName プロパティを使って明示的に指定も可能

            // ... rest of ApplicationStack ...
          }
        }
        ```
4.  開発環境 (dev) としてデプロイします (デフォルト): `cdk deploy --all`
5.  本番環境 (prd) としてデプロイします: `cdk deploy --all -c env=prd` (別のスタック名 `*-prd` で作成されます)
6.  AWSコンソールで `NetworkStack-dev`, `ApplicationStack-dev`, `NetworkStack-prd`, `ApplicationStack-prd` の4つのスタックが作成されていることを確認します。それぞれのNAT Gateway数やL1バケット名が異なることを確認します。

**ステップ6: 複数アカウント/リージョンへのデプロイ準備**

`bin/app.ts` で環境ごとに異なるAWSアカウントIDとリージョンを指定できるように準備します。これにより、dev環境は開発アカウント、prd環境は本番アカウント、といったデプロイが可能になります。

1.  **`cdk.json`** の `context` に、各環境のアカウントIDとリージョンを追加します。
    ```json
    {
      // ... existing context ...
      "context": {
        "dev": {
          "envName": "dev",
          "natGateways": 1,
          "bucketPrefix": "dev-",
          "account": "111111111111", // 開発アカウントID (仮)
          "region": "us-east-1"    // 開発リージョン (仮)
        },
        "prd": {
          "envName": "prd",
          "natGateways": 2,
          "bucketPrefix": "prd-",
          "account": "999999999999", // 本番アカウントID (仮)
          "region": "ap-northeast-1" // 本番リージョン (仮)
        }
      }
      // ... rest of cdk.json ...
    }
    ```
    * **注意:** ここに実際のAWSアカウントIDをハードコードするのはセキュリティ上推奨されません。実際の運用では、環境変数やAWS Secrets Managerなどから取得する方法を検討してください。このハンズオンでは説明のため直接記述します。
2.  **`bin/advanced-cdk-app.ts`** を編集し、コンテキストから読み込んだアカウントIDとリージョンを `StackProps` の `env` に設定します。
    ```typescript
    // ... (imports) ...
    const app = new cdk.App();
    const envName = app.node.tryGetContext('env') || 'dev';
    const envContext = app.node.tryGetContext(envName);
    if (!envContext) { /* ... error handling ... */ }

    // 環境に応じた StackProps (env をコンテキストから設定)
    const stackProps: cdk.StackProps = {
      env: {
        account: envContext.account || process.env.CDK_DEFAULT_ACCOUNT, // コンテキスト優先、なければデフォルト
        region: envContext.region || process.env.CDK_DEFAULT_REGION, // コンテキスト優先、なければデフォルト
      },
      terminationProtection: envName === 'prd',
    };

    // ネットワークスタックを作成
    const networkStack = new NetworkStack(app, `NetworkStack-${envName}`, {
      ...stackProps, // 更新された stackProps を渡す
      natGateways: envContext.natGateways,
    });

    // アプリケーションスタックを作成
    const appStack = new ApplicationStack(app, `ApplicationStack-${envName}`, {
      ...stackProps, // 更新された stackProps を渡す
      vpc: networkStack.vpc,
      bucketPrefix: envContext.bucketPrefix,
    });

    // ... (Tags) ...
    ```
3.  これで、`-c env=dev` や `-c env=prd` を指定して `cdk deploy` を実行すると、`cdk.json` で定義された対応するアカウントとリージョンにデプロイされるようになります。
    * **重要:** デプロイを実行する前に、各ターゲットアカウント/リージョンで `cdk bootstrap aws://ACCOUNT-ID/REGION --profile YOUR-PROFILE-NAME` を実行しておく必要があります。また、`aws configure` で適切なプロファイルを設定するか、コマンド実行時に `--profile YOUR-PROFILE-NAME` を指定する必要があります。

**ステップ7: 特定環境のデプロイとクリーンアップ**

最後に、特定の環境（アカウント/リージョン）を指定してデプロイを実行し、不要になったリソースをクリーンアップします。

1.  **開発環境 (dev) へのデプロイ (アカウント/リージョン指定):**
    * `aws configure` で開発環境用のプロファイルが設定されていることを確認（または `--profile dev-profile` のように指定）。
    * 開発環境のブートストラップ: `cdk bootstrap aws://111111111111/us-east-1 --profile dev-profile` (初回のみ)
    * 開発環境のデプロイ: `cdk deploy --all -c env=dev --profile dev-profile`
2.  **本番環境 (prd) へのデプロイ (アカウント/リージョン指定):**
    * `aws configure` で本番環境用のプロファイルが設定されていることを確認（または `--profile prd-profile` のように指定）。
    * 本番環境のブートストラップ: `cdk bootstrap aws://999999999999/ap-northeast-1 --profile prd-profile` (初回のみ)
    * 本番環境のデプロイ: `cdk deploy --all -c env=prd --profile prd-profile`
3.  **クリーンアップ:**
    * 作成したリソースが不要になったら、各環境に対して削除コマンドを実行します。
    * 開発環境の削除: `cdk destroy --all -c env=dev --profile dev-profile`
    * 本番環境の削除: `cdk destroy --all -c env=prd --profile prd-profile` (削除保護が有効な場合は、AWSコンソールまたはAWS CLIで先に無効化する必要があります)
    * 確認画面で `y` を入力して削除を実行します。
