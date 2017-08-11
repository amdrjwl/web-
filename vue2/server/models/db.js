/**
 * Created by Danny on 2015/9/25 9:31.
 */
//这个模块里面封装了所有对数据库的常用操作
var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");
//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
//封装成为内部函数
function _connectDB(callback) {
    var url = settings.dburl;   //从settings文件中，都数据库地址
    //连接数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}


//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
exports.find = function (collectionName, json, callback) {
    var result;    //结果数组
   

    //连接数据库，连接之后查找所有
    _connectDB(function (err, db) {
        var cursor = db.collection(collectionName).find(json);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close(); //关闭数据库
                return;
            }
            if (doc != null) {
              //  result.push(doc);   //放入结果数组
              
             result= doc
              
            } else {
                //遍历结束，没有更多的文档了
                callback(null, result);
                db.close(); //关闭数据库
            }
        });
    });
}


