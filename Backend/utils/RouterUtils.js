export const handleBasicRequest = async (req, res, action, operation, defaultMessage = null) => {
    try {
        const result = await action();
        res.status(200).json({
            success: true,
            message: defaultMessage || `${operation} successful`,
            ...(result && { data: result }),
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message || `${operation} failed`,
        });
    }
};

export default {
    handleBasicRequest,
}