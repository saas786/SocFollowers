package ru.laravelka.socfollowers;

import android.os.Bundle;

import app.xplatform.capacitor.plugins.AdMob;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Initializes the Bridge
		this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
			add(AdMob.class);
		}});
	}
}