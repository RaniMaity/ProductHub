
const AppError = require("../utils/AppError");

class UserValidator {

    static validateFullName(fullName) {
        if (!fullName) {
            throw new AppError("Full name is required", 400);
        }

        if (typeof fullName !== "string") {
            throw new AppError("Full name must be a string", 400);
        }

        if (fullName.trim().length < 3) {
            throw new AppError("Full name must contain at least 3 characters", 400);
        }

        return true;
    }

    static validateEmail(email) {
        if (!email) {
            throw new AppError("Email is required", 400);
        }

        if (typeof email !== "string") {
            throw new AppError("Email must be a string", 400);
        }

        if (!email.includes("@") || !email.includes(".")) {
            throw new AppError("Please enter a valid email", 400);
        }

        return true;
    }

    static validatePhoneNumber(phoneNumber) {
        if (!phoneNumber) {
            throw new AppError("Phone number is required", 400);
        }

        if (typeof phoneNumber !== "string") {
            throw new AppError("Phone number must be a string", 400);
        }

        if (
            phoneNumber.trim().length !== 10 ||
            isNaN(Number(phoneNumber.trim()))
        ) {
            throw new AppError("Please enter a valid phone number", 400);
        }

        return true;
    }

    static validatePassword(password) {
        if (!password) {
            throw new AppError("Password is required", 400);
        }

        if (typeof password !== "string") {
            throw new AppError("Password must be a string", 400);
        }

        return true;
    }

    static validateUser(fullName, email, phoneNumber, password) {
        this.validateFullName(fullName);
        this.validateEmail(email);
        this.validatePhoneNumber(phoneNumber);
        this.validatePassword(password);

        return true;
    }

    static validateUpdateUser(fullName, email, phoneNumber, password) {
        this.validateFullName(fullName);
        this.validateEmail(email);
        this.validatePhoneNumber(phoneNumber);

        if (password !== undefined && password !== "") {
            this.validatePassword(password);
        }

        return true;
    }
}

module.exports = UserValidator;
