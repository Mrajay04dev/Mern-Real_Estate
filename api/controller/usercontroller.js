export const test = (req, res) => {
    res.json({
        "message": "Hello World"
    })
    console.log(req.body)
}