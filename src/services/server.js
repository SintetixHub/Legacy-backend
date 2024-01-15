import express from "express";

const app = express();

app.get("/", async (req,res) => {
    res.status(200).json({status: "Server up"})
})

app.use((req, res) =>{
    res.redirect("/")
})

export default app;