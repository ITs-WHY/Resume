## JS 定时纠偏

由于 JS 的单线程特性，又由于 JS 的定时是由异步来完成的，所以定时一定是不准的，所以需要纠偏措施。

#### 定时向服务器发送请求，获取最新时间差

最简单的方法，但是需要多次发送请求。

#### 不依赖服务端的倒计时纠偏

1. 首先定义 count 为执行次数，interval 为每次执行的时间间隔，start 为开始时间
2. 通过 count*interval 计算出理论经过的时间，再和现在的时间对比，计算出偏差 offset
3. 下一次计时的时间为 interval - offset 的值。

#### 不依赖服务端的倒计时纠偏

当前时间减去开始时间，然后和倒计时总时间求差。可设置刷新间隔。