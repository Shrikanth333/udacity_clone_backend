const express=require("express")
const app=express()
require ("dotenv").config()



app.use(express.json());


app.use("/program/",require('./controllers/router/program.js')
)
app.use("/program/lesson",require('./controllers/router/programLessons.js')
)
app.use("/program/instructor",require('./controllers/router/programInstructor.js')
)
const port=process.env.PORT || 8000
app.use(function(err, req, res, next) {
    
    res.status(500).send(err.message);
  });

app.listen(port)


