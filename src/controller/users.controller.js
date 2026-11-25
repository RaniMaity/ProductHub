const UserService = require("../services/users.service");
const UserValidator = require("../validation/user.validation");

class UserController {
    constructor() {
        this.userService = new UserService();
    }

  
    createUser = async (req, res) => {
        try {
            const { fullName, email, phoneNumber, password } = req.body;

            UserValidator.validateUser(
                fullName,
                email,
                phoneNumber,
                password
            );

            const user = await this.userService.createUser(
                fullName,
                email,
                phoneNumber,
                password
            );

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

  
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: users
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get User By ID
    getUserById = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await this.userService.getUserById(id);

            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Update User
    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { fullName, email, phoneNumber, password } = req.body;

            UserValidator.validateUpdateUser(
                fullName,
                email,
                phoneNumber,
                password
            );

            const user = await this.userService.updateUser(
                id,
                fullName,
                email,
                phoneNumber,
                password
            );

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Delete User
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await this.userService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Change User Status
    statusChange = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const user = await this.userService.statusChange(id, status);

            res.status(200).json({
                success: true,
                message: "User status changed successfully",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = UserController;