class User1 {
    private age = 0;
}

// これはエラー
class SuperUser1 extends User1 {
    private age = 1;
}

class User2 {
    #age = 0;
}

// これはOK
class SuperUser2 extends User2 {
    #age = 1;
}
