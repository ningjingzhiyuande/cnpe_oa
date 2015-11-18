# 文洋测试服务器部署指南

```bash
appdir=/home/yang/Sites/cnpe_oa
```

## Step1: 获取代码

在appdir放入最新的cnpe_oa代码 # laocao 版本： https://github.com/cao7113/cnpe_oa

手动配置config/database.yml 

```bash
cd $appdir
bundle install
```

## Step2: 构建DB

```bash
rake db:create:all #第一次部署时执行

bundle exec rake db:migrate
RAILS_ENV=production bundle exec rake db:migrate
```

# 可用rails s 本地运行开发模式测试

## Step3: 编译静态资源

```bash
RAILS_ENV=production bundle exec rake assets:precompile
RAILS_ENV=production bundle exec rake kindeditor:assets
```

## Step4 配置unicorn

仿照之前项目的unicorn的配置， 制作 /etc/init.d/unicorn_cnpe_oa.sh

启动unicorn

```bash
/etc/init.d/unicorn_cnpe_oa.sh start
```

有问题时查看unicorn 错误日志： log/unicorn*.log

## Step5 配置nginx

仿照之前项目的nginx的配置， 制作 /etc/nginx/sites-enable/cnpe_oa.conf
重启nginx  

```bash
sudo service nginx restart
```

有问题时查看nginx错误日志 /var/log/nginx*

## 测试部署是否成功

访问/etc/nginx/sites-enable/cnpe_oa.conf 中配置的域名

并观察unicorn和nginx log，如有错误作相应调整

## 特别提示：

1. 因为当时没测试, 请检查 $appdir/config/unicorn.rb中的配置信息 和 /etc/init.d/unicorn_cnpe_oa.sh中配置时对应，否则可能导致问题  
2. 请妥善处理之前部署的项目(如关停，或数据如何转移到新项目中来），以免和当前项目产生配置冲突

相关问题请联系国栋或老曹


## 后期维护部署 

请在mysql命令行中输入

1. 从宴请系统中导出 宴请表

```sql
SELECT * INTO OUTFILE '/tmp/yanqing.txt' FROM cgboa_development.entretains;
```

2. 把宴请数据导入到请假系统

```sql
LOAD DATA INFILE '/tmp/yanqing.txt' INTO TABLE cgboa2_development.entretains;
```

验证数据导入正确性

```sql
select count(*) from cgboa_development.entretains;
select count(*) from cgboa2_development.entretains;
```

看看两个数据是否一致！


## Bug 维护记录

### 修复宴请导入数据问题

Step1. 在 config/database.yml中增加片段 参考 config/database.yml.sample

```ruby
yanqing:
  <<: *default
  database: yanqing #这里换成宴请的db
```

Step2. 启动控制台测试是否正常 

rails console>> UserYq.count #输出宴请系统中的用户数量，大于0

Step3. 没问题了，跑修复脚本！！！

  a). 进入项目根目录下
  
  b). run:
 
```ruby
RAILS_ENV=production rails runner script/fix_entretains.rb | tee log/fix-yanqing.log
```

有些错误未修复数据会出现在log最后(注意保存后期修复），需人工修复一下！
此脚本修复绝大部分数据问题
