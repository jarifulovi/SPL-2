

const handleBasicRequest = async (req, res, action) => {
    try {
        const result = await action();
        res.status(200).json({
            success: true,
            message: 'Operation successful',
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message || 'Operation failed',
        });
    }
};


export default {
    handleBasicRequest,
}