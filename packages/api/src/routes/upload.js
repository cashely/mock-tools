import multer from "multer";
import Router from "../utils/route";
import swaggerParser from "../utils/swaggerParser";

const router = new Router({
    // auth: true
});

router
.use(multer().any())
.post("/swagger", (req, res) => {
    
    try {
        const { files } = req;
        if (files.length === 0) {
            return res.response.error(400, "没有选择文件");
        }

        const file = files[0];
        const { buffer } = file;
        const json = JSON.parse(buffer.toString());
        const jsonSchema = swaggerParser(json);

        // console.log(jsonSchema)
        res.response.success(jsonSchema);
    } catch (error) {
        console.log(error, 'error')
    }
});

export default router;