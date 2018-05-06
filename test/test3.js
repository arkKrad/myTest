// Promiseの理解
main();

function main() {
    // promiseで呼び出し
    print_hello()
    // thenを通してprint_worldを呼び出し
      .then(() => {
        print_world();
    // thenの処理内のエラーハンドリング
    }).catch((error) => {
        console.log(error);
    });
    
}

function print_hello() {//promiseを返却するように修正
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Hello,');
            resolve();
        }, 500);
    });
}

function print_world() {　//この中身は変更不可
    console.log('world!');
}

process.on("exit", () => {
    process.exit(0);
});