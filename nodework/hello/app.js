const Koa=require('koa')
//路由
const router=require('koa-router')()
//解析
const bodyParser=require('koa-bodyparser')

const app=new Koa()

//记录url
app.use(async (ctx,next)=>{
  console.log(`Process ${ctx.request.method}:${ctx.request.url}...`)
  await next();
})

router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/',async (ctx,next)=>{
  ctx.response.body=`<h1>Index</h1>
  <form action='/signin' method="post">
    <p>Name:<input name="name" value="koa"></p>
    <p>Password:<input name="password" type="password"></p>
    <input type="submit" value="Submit">
  </form>`;
})

router.post('/signin',async (ctx,next)=>{
  var
   name=ctx.request.body.name||'',
   password=ctx.request.body.password||'';
   if(name==='koa'&&password==='123456'){
     ctx.response.body=`<h1>Welcom,${name}!</h1>`;
   }else{
     ctx.response.body=`<h1>Login failed!</h1>
     <p><a href="/">Try again</a></p>`
   }
})

//添加
app.use(bodyParser());
//添加router中间件
app.use(router.routes())
app.listen(3000);

console.log('app started at 3000 port ...');