
// コールバックの理解
main();

function main() {  //この中身は書き換えてOK
    var test1 = 'テスト１'

    // 引数の最後がコールバック
    print_hello(test1,print_world); 
    // print_world(); //このままだとうまくいかない
}

// 便宜上、非同期処理にしてある。引数や中身は書き換えてOK。
function print_hello(test1, callback) { 
    setTimeout(() => {
        console.log(test1);
        callback();
    }, 500);
}

// この中身は変更不可
function print_world() {　
    console.log('world!');
}

process.on("exit", () => {
    process.exit(0);
});