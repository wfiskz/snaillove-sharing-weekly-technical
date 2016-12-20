多线程的意义  
技术上的事情都得先理解意义，才能针对原理去做更好的改进。  
为什么会有多线程  
不知道有人想过这个问题没有，这个问题很关键，如果不理解这个问题，甚至可能接下来你对于多线程该用在什么场景都不知道  。
要理解这个问题，得首先知道现在计算机系统，为什么大多数主机只有一个CPU，但很多任务进程都能同时进行。是因为CPU的处理速度非常快，在进程之间切换非常迅速，导致了多进程同时进行的假象。现在要提高计算机的运行速度，瓶颈并不在于CPU，而是内存和硬盘的存取速度。  
多线程就是为了提高CPU的使用率，最大化使用CPU。  
搞清楚这一点，大概就知道两个信息  
一、如果CPU处理能力不够高的话，就不会有多线程的概念。  
二、如果CPU的使用已经达到最大化了，就没必要再开多线程了。  
来看一个最能体现多线程与单线程运行时间的区别。  
来看下面的示例:  
现在是单线程模式，如果把注释去掉，再将t.fn()注释掉，就是多线程。  
从运行时间多少就可以看出多线程和单线程的区别  
单线程跑完，大概需要14秒，多线程是11秒。不同的机子，结果都不太一样。虽然只有三秒的差距，但首先这是没有经过逻辑处理的，其次，一个优秀的代码就是体现在这些细节上的。  
public class test {  
    public static void main(String[] args){  
        Ticket t =new Ticket();  
        t.fn();  
//        Thread t1 = new Thread(t,"1");  
//        Thread t2 = new Thread(t,"2");  
//        Thread t3 = new Thread(t,"3");  
//        Thread t4 = new Thread(t,"4");  
//        t1.start();  
//        t2.start();  
//        t3.start();  
//        t4.start();  
    }  
}  
class Ticket implements Runnable{  
    private  long ticket = 1000000;  
    private long stime ;  
    private long etime ;  
    public  void fn (){  
//    	if(stime==0&&Thread.currentThread().getName().equals("1"))  
//    	{  
    		stime = new java.util.Date().getTime();  
//    	}  
    	 while(ticket>0){  
                 try {  
                     //Thread.sleep(20);  
                 } catch (Exception e) {  
                     e.printStackTrace();  
                 }  
                 System.out.println(Thread.currentThread().getName()+"---sale"+ticket--);  
             }  
//    	 if(Thread.currentThread().getName().equals("1"))  
//     	{  
    		 etime =  new java.util.Date().getTime();  
    		 System.out.println(etime-stime);  
//     	}  
    }  
    public void run(){  
    	fn();  
    }  
}
