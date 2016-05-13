package nurse.yj.com.alipay;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MainActivity extends Activity {

    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = (Button) findViewById(R.id.buttom);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Alipay alipay = new Alipay(MainActivity.this);

                //    String body //商品描述
                //    String subject // 商品名称
                //    Number total_fee // 金额
                //    String notify_url // 服务器异步通知页面路径
                //    String partner  // 签约合作者身份ID
                //    String seller_id    //   // 签约卖家支付宝账号
                //    String out_trade_no   // 商户网站唯一订单号
                //    String public_key  //支付宝公钥
                //    String public_key  //支付宝私钥


                String body = "";
                String subject = "";
                String total_fee = "";
                String partner = "";
                String seller_id = "";
                String out_trade_no = "";
                String private_key = "";
                String public_key = "";
                String notify_url = "";
                // 传入数据
                alipay.pay(body, subject, total_fee, partner, seller_id, out_trade_no, private_key, public_key, notify_url);
            }
        });

    }


}
