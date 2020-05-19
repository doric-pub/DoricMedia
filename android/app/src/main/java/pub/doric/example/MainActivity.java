package pub.doric.example;


import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import pub.doric.DoricActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (savedInstanceState == null) {
            Intent intent = new Intent(this, DoricActivity.class);
            String BUNDLE_NAME = "doriclib-media";
            intent.putExtra("source", "assets://" + BUNDLE_NAME + ".js");
            intent.putExtra("alias", BUNDLE_NAME);
            startActivity(intent);
            finish();
        }
    }
}
