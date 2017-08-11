var koa= require('koa')
var controller=require('koa-route')
var app=new koa()
var views=require('co-views')
var qs=require('querystring')

var render=views('./view',{
	map:{html:'ejs'}
})
var koa_static=require('koa-static-server')
var service=require('./service/webAppService.js')
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxAge:0
}))



app.use(controller.get('/api_test',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body=service.get_test_data()
}))

app.use(controller.get("/ajax/index",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	ctx.body = service.get_index_data();
}));

app.use(controller.get("/ajax/rank",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	ctx.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/male',async (ctx)=>{
	ctx.set('Cache-Control','no-cache');
	ctx.body = service.get_male_data();
}));

app.use(controller.get('/ajax/female',async (ctx)=>{
	ctx.set('Cache-Control','no-cache');
	ctx.body = service.get_female_data();
}));



app.use(controller.get("/ajax/bookbacket",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	ctx.body = service.get_bookbacket_data();
}));

app.use(controller.get("/ajax/category",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	ctx.body = service.get_category_data();
}));

app.use(controller.get("/ajax/book",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	var params = qs.parse(ctx.req._parsedUrl.query); // 把url上带的参数串转成数组对象
	var id=params.id
	if(!id){
		id=''
	}
	ctx.body = service.get_book_data();
}));

app.use(controller.get("/ajax/chapter",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	ctx.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data',async (ctx)=>{
	ctx.set('Cache-Control', 'no-cache');
	var params = querystring.parse(ctx.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	ctx.body = service.get_chapter_content_data(id);
}));

app.use(controller.get("/ajax/search",async (ctx)=>{
	ctx.set("Cache-Control","no-cache");
	var params = qs.parse(ctx.req._parsedUrl.query); // 把url上带的参数串转成数组对象

	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	console.log(service.get_search_data(start,end,keyword))
	ctx.body =await service.get_search_data(start,end,keyword);
}));

app.use(controller.get('/chapter',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body = await render('catolog',{nav:'目录'});
}));


app.use(controller.get('/',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body=await render('index',{nav:'书城首页'})
}))

app.use(controller.get('/search',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body=await render('search',{nav:'搜索页面'})
}))

app.use(controller.get('/male',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body = await render('male',{nav:'男生频道'});
}));

app.use(controller.get('/female',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body = await render('female',{nav:'女生频道'});
}));

app.use(controller.get('/category',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body = await render('category',{nav:'分类页面'});
}));

app.use(controller.get('/rank',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body = await render('rank',{nav:'排行页面'});
}));

app.use(controller.get('/reader',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	ctx.body=await render('reader')
}))

app.use(controller.get('/usercenter',async function(ctx){
	ctx.set('Cache-Control', 'no-cache');
	ctx.body = await render('user-center',{nav:'用户中心'});
}));

app.use(controller.get('/book',async function(ctx){
	ctx.set('Cache-Control','no-cache');
	var params=qs.parse(this.req._parsedUrl.query);
	var bookId=params.id;
	ctx.body=await render('book',{ nav:'书籍详情',bookId:bookId })
}))



app.listen(3000)
