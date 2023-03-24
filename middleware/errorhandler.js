module.exports = class CustomError extends Error {
    constructor(message, status) {
        super() // 상속 클래스의 생성자에서는 반드시 super() 호출
        this.message = message
        this.status = status
        this.expect = true
    }
}
