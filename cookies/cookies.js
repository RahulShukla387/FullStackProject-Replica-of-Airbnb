  let mysecret = process.env.secret;
  import cookieParser from "cookie-parser";
import express from "express";
  const router = express.Router({mergeParams: true});
router.use(cookieParser(mysecret));

router.get("/",(req, res)=>{
    res.cookie("greet","namaste");
    // let {greet} = req.cookies;
    // console.dir(greet);
    res.send("your cookies are working properly");
})
router.get("/signed", (req, res)=>{
  res.cookie("country", "India", {signed: true});
  res.send("Signed cookies has been sent ");
})
router.get("/verified", (req, res)=>{
    console.dir(req.cookies);
    console.dir(req.signedCookies);
})
export default router;