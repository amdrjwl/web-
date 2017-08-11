const MongoClient=require('mongodb').MongoClient;
const settings=require('../settings.js')


function connectDB(callback){
	let url=settings.dburl
	MongoClient.connect(url,function(err,db){
		if(err){
			callback(err,null);
			return
		}
		
		callback(err,db)
	})
}



exports.find=function(collectionname,json,callback){
	let result;
	
	connectDB(function(err,db){
		let cursor=db.collection(collectionname).find(json)
		cursor.each(function(err,doc){
			if(err){
				callback(err,null);
				db.close()
				return
			}
			
			if(doc!=null){
				result=doc
			}else{
				callback(null,result)
				db.close
			}
		})
		
		
	})
	
	
	
}
