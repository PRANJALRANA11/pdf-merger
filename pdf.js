const express=require('express');
const app=express();
const pdfmerger=require('pdf-merger-js');
const multer=require('multer');
const upload=multer({dest:'uploads/'})
const path=require('path');
app.use("/static" ,express.static('static'))
app.get("/index" ,(req,res)=>{
    res.sendFile(path.join(__dirname,"static/index.html"))});
var merger = new pdfmerger();
const merge=(async (p1,p2)=>{
    await merger.add(p1);
    await merger.add(p2);
    await merger.save( "merged.pdf");
})

app.post('/merge',upload.array('pdfs',2),async (req,res,next)=>{
    await path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path)
    res.redirect("http://localhost:80/static/merged.pdf")
})

app.listen(80,()=>{
    console.log("server running")
})