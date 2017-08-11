var fs = require('fs')
var http = require('http')
var qs = require('querystring')
exports.get_test_data = function () {
	var content = fs.readFileSync('./mock/test.json', 'utf-8')

	return content
}

exports.get_chapter_data=function(){
	var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8')
	return content
}
exports.get_chapter_content_data=function(id){
	if(!id){
		id='1'
	}
	var content = fs.readFileSync('./mock/reader/data/data'+id+'.json', 'utf-8')
	return content
}

exports.get_index_data=function(){
	var content = fs.readFileSync('./mock/home.json', 'utf-8')
	return content
}

exports.get_rank_data=function(){
	var content = fs.readFileSync('./mock/rank.json', 'utf-8')
	return content
}

exports.get_bookbacket_data=function(){
	var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8')
	return content
}

exports.get_category_data=function(){
	var content = fs.readFileSync('./mock/category.json', 'utf-8')
	return content
}
exports.get_book_data=function(id){
	if (!id) {
		id = "18218";
	}
	if(fs.existsSync('./mock/book/' + id + '.json')){
	 	return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json', 'utf-8');
	}
}


exports.get_search_data = function (start, end, keyword) {
	return new Promise((resolve, reject) => {
		var data = {
			s: keyword,
			start: start,
			end: end
		};

		var content = qs.stringify(data); // {a : '1'} => http://hostname:port/path?a=1

		var http_request = {
			hostname: "dushu.xiaomi.com",
			port: 80,
			path: "/store/v0/lib/query/onebox?" + content
		};
		var _content = "";
		var req_obj = http.request(http_request, function (_res) {

			_res.setEncoding("utf8");
			_res.on("data", function (chunk) {
				_content += chunk; // data事件每次只有一个片段chunk
			});
			_res.on("end", function () {
				resolve(_content)
				console.log(_content + '0')
			});
		});


		req_obj.on("error", function () {
			reject('ss')
		});

		req_obj.end();

	})



}