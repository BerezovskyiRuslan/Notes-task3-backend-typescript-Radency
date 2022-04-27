import Express from 'express'

const errorHandler = (res: Express.Response, error: any) => {
    console.log(error);

    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
export { errorHandler }