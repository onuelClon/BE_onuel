const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const port = 5000;
const globalRouter = require('./routes');
const { sequelize } = require('./models');

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Sync success');
    })
    .catch((error) => {
        console.error('Sync error', error);
    });

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/', globalRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        errorMessage: err.message || '예상하지 못한 에러가 발생하였습니다.',
    });
});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
///////////////////////////////////
// import AWS from 'aws-sdk';

// export function onFileUpload(e) {
//     const ACCESS_KEY = '계정 PUBLIC ACCESS KEY입력';
//     const SECRET_ACCESS_KEY = '계정 SECRET ACCESS KEY입력';
//     //버킷리전
//     const REGION = " ap-northeast-2";
//     const S3_BUCKET = 'upload-img';

//     // AWS ACCESS KEY를 세팅합니다.
//     AWS.config.update({
//       accessKeyId: ACCESS_KEY,
//       secretAccessKey: SECRET_ACCESS_KEY
//     });

//     // 버킷에 맞는 이름과 리전을 설정,세팅 부분
//     const myBucket = new AWS.S3({
//       params: { Bucket: S3_BUCKET},
//       region: REGION,
//     });

    
//     // 파일과 파일이름을 넘겨주면 됩니다. 
//     // 이 함수를 input에 세팅 -> 
//     // 완료 후 아래 파일 가져와서 s3에다 업로드를 하는 라인
//     const file = e.target.files[0];
//     console.log(file);
//     console.log(file.name);
//     const params = {
//       ACL: 'public-read',
//       Body: file,
//       Bucket: S3_BUCKET,
//       Key: file.name
//     };
    
//     //putObject를 통해 parms를 주면 alert으로 Success 알람
//     myBucket.putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         alert("SUCCESS")
//       })
//       .send((err) => {
//         if (err) console.log(err)
//       })
//   } 

//   return { 
//     <div className="App">
//     <input type={"file"} onChange={onFileUpload} />
//     </div>
//   }
  ////////////////////////////////