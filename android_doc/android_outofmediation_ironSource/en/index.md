
# Mediation Integration Guide(Android)

##Overview    

This document describes Android developers how to aggregate other third-party ads SDK through Mintegral. 
Currently only supported aggregated ironsource Banner、Rewarded Video、Interstitial, and Interstitial corresponds to Mintegral Interstitial.

## Mintegral Setting


Please read the [Mintegral Android SDK](https://dev.mintegral.com/doc/index.html?file=sdk-m_sdk-android&lang=en) integration document carefully, which introduces the necessary integration steps such as the packages that need to be imported for each advertising form, code obfuscation, AndroidManifest permissions and Activity registration.  

### Retrieve account-related information

**APP Key**   
Each Mintegral account has a corresponding App Key, and the key will be needed for requesting ads. It can be retreived from your Mintegral account through the following path: **APP Setting -> App Key**:  
![](https://github.com/Vivi012/MTG/blob/master/apikey.png?raw=true) 

**App ID**   
The M-system will automatically generate a corresponding App ID for each app created by the developer. Find the App ID(s)  here: **APP Setting -> APP ID**:  
![](https://github.com/Vivi012/MTG/blob/master/appid.png?raw=true) 

**Unit ID**  
The M-system will automatically generate a corresponding Unit ID for each ad space created by the developer. Find the Unit ID here: Login **m-system —> Ad Unit —> Ad Unit**:  
![](https://github.com/Vivi012/MTG/blob/master/unitid.png?raw=true) 


###  Obtain the SDK

Import the MTGSDK provided by AM, or from [Mintegral Android SDK](https://dev.mintegral.com/doc/index.html?file=sdk-m_sdk-android&lang=en) to obtain the SDK.


##ironsource Setting

### Create your account
####[Sign up](https://platform.ironsrc.com/partners/signup)and[sign in](https://platform.ironsrc.com/partners/tour)to your ironSource account.     
####New App 
To add your application to the ironSource dashboard, click the **New App** button.

![](https://github.com/Vivi012/MTG/blob/master/ir1.png?raw=true)

### Enter app details

Select **Mobile App**, enter the **Google Play URL** of your app, and click **Import App Info**. Once your app information is displayed, click the **Add App** button.

If your app is not available, select **App Not Live in the Application Store** and provide a **Temporary Name** for your app. Select Android as **platform** and click **Add App**.

![](https://github.com/Vivi012/MTG/blob/master/ir2.png?raw=true)

####Unit Setting
Take note of your new **App Key**, This value will used when load ads. Select the ad formats your app supports in the appropriate tabs. Then click **Done**.

![](https://developers.google.com/admob/images/mediation/ironsource/ad_format_select_android.png)


###Integrating ironSource 
reference linking: [ironsource Integration Guide](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/)

#### Import ironsource sdk

Add the following ironSource Maven repository and implementation dependency with the latest version of the ironSource SDK and adapter in the app-level build.gradle file:

```java
repositories {
    maven {
        url "https://dl.bintray.com/ironsource-mobile/android-sdk"
   }
}    
 

dependencies {
    implementation 'com.ironsource.sdk:mediationsdk:7.0.1.1' 
}
```
#### Modify Android manifest 

```java
 <activity
            android:name="com.ironsource.sdk.controller.ControllerActivity"
            android:configChanges="orientation|screenSize"
            android:hardwareAccelerated="true" />
        <activity
            android:name="com.ironsource.sdk.controller.InterstitialActivity"
            android:configChanges="orientation|screenSize"
            android:hardwareAccelerated="true"
            android:theme="@android:style/Theme.Translucent" />
        <activity
            android:name="com.ironsource.sdk.controller.OpenUrlActivity"
            android:configChanges="orientation|screenSize"
            android:hardwareAccelerated="true"
            android:theme="@android:style/Theme.Translucent" 
/>
```
#### Code obfuscation configuration

```java
-keepclassmembers class com.ironsource.sdk.controller.IronSourceWebView$JSInterface {
    public *;
}
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}
-keep public class com.google.android.gms.ads.** {
   public *;
}
-keep class com.ironsource.adapters.** { *;
}
-dontwarn com.ironsource.mediationsdk.**
-dontwarn com.ironsource.adapters.**
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```


### Import Adapter 
AM will provide a “Mediation” package, Please copy all the files in it to your project.

## Banner
###  Init Banner
####  Create MediationBannerHandler

```java
manager = new MediationBannerHandler();
```  

#### Set MediationAdapterInitListener 
Need to be called before initialization.

```java
      manager.setMediationAdapterInitListener(new MediationAdapterInitListener() {
           /**
           * InitSucceed
           */
           
            @Override
            public void onInitSucceed() {
                Toast.makeText(BannerActivity.this,"onInitSucceed",Toast.LENGTH_LONG).show();
                Log.e("banner","onInitSucceed");
            }
            
           /**
           * InitFailed
           */

            @Override
            public void onInitFailed() {
                Toast.makeText(BannerActivity.this,"onInitFailed",Toast.LENGTH_LONG).show();
                Log.e("banner","onInitFailed");
            }
        });
```

#### Call init method

You should configure parameters such as ad id, Adapter absolute Path and timeout in Map when called initialization.
   
Sample Code：

```java
	Map<String,Object> paramsMap = new HashMap<>();
        //IronSource
        AdSource adSource = new AdSource();
        Map<String,Object> ironsourceMap = new HashMap<>();
        ironsourceMap.put("local","xxxxxx");//The value is the AppKey of ironsource
        ironsourceMap.put(CommonConst.KEY_BANNER_SIZE_TYPE,1);//The value is BannerSize, which can be viewed in the Ironsource Banner document
        adSource.setLocalParams(ironsourceMap);
        adSource.setTargetClass("com.mintegral.mediation.adapter.iron.IronInterstitialAdapter");//The Adapter path here corresponds to the full path of the file in your project
        adSource.setTimeOut(10000);//Request ad timeout
        paramsMap.put("2",adSource);//Set the ad priority, 1 is the priority display, the default priority is to request Mintegral ads.

        //Mintegral
        Map<String,Object> map = new HashMap<>();
        AdSource mtgAdSource = new AdSource();
        map.put(CommonConst.KEY_APPID, "your AppId");
        map.put(CommonConst.KEY_APPKEY, "your AppKey");
        map.put(CommonConst.KEY_BANNER_UNIT_ID, "your unitId");
        map.put(CommonConst.KEY_BANNER_REFRESH_TIME,10);//Automatic refresh time.
        map.put(CommonConst.KEY_BANNER_SIZE_TYPE,1);//The value is BannerSize, which can be viewed in the MTG Banner document
        mtgAdSource.setLocalParams(map);
        mtgAdSource.setTargetClass("com.mintegral.mediation.adapter.mtg.MTGInterstitialAdapter");
        mtgAdSource.setTimeOut(10000);
        paramsMap.put("1",mtgAdSource);
        
 	      /** 
         * init
         */
         
	      manager.init(this,paramsMap);   
 
```

#### Set MediationAdapterBannerListener
```java

mediationBannerHandler.setMediationAdapterBannerListener(new MediationAdapterBannerListener() {
            
            @Override
            public void loadSucceed() {
                Toast.makeText(BannerActivity.this, "loadSucceed", Toast.LENGTH_LONG).show();
            }

            @Override
            public void loadFailed(String msg) {
                Toast.makeText(BannerActivity.this, "loadFailed:" + msg, Toast.LENGTH_LONG).show();
            }

            @Override
            public void showSucceed() {
                Toast.makeText(BannerActivity.this, "showSucceed:", Toast.LENGTH_LONG).show();
            }

            @Override
            public void showFailed(String msg) {
                Toast.makeText(BannerActivity.this, "showFailed:" + msg, Toast.LENGTH_LONG).show();
            }

            @Override
            public void clicked(String msg) {
                Toast.makeText(BannerActivity.this, "clicked:" + msg, Toast.LENGTH_LONG).show();
            }

            @Override
            public void closed() {
                Toast.makeText(BannerActivity.this, "closed:", Toast.LENGTH_LONG).show();
            }

        });
```

#### Get the Activity LifecycleListener
Ironsource requires called the method.

```java

  lifecycleListener = manager.getLifecycleListener();
```
you can called these method during the lifecycle of the Activity.     
       
```java

    @Override
    protected void onPause() {
        super.onPause();
        if(lifecycleListener != null){
            lifecycleListener.onPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(lifecycleListener != null){
            lifecycleListener.onResume(this);
        }
    }
```

### Load ads
It is recommended that developers preload Adss before displaying them (either during initialization or after closing each ad). This way, it allows more time for the creative material to download and also decreases the amount of wait time for users to see an ad. Use the below method to load and display ads.    

```java
                /**
                 * @param At present you can set to ""
                 */
                 
                if (mediationBannerHandler != null) {
                    mediationBannerHandler.load("");
                }
```
### Show ads
```java
                /**
                 * @param At present you can set to ""
                 */
                 
                 if (mediationBannerHandler != null) {
                    //The first parameter can be filled with an empty string, and the second parameter is the content of banner ads.
                    mediationBannerHandler.showBanner("",adContainer);
                 }
```
### Check ads availability
it will return boolean。    

```java

                /**
                * @param At present you can set to ""
                */
                
                if (mediationBannerHandler != null) {
                    mediationBannerHandler.isReady("");
                }
```



## Interstitial

###Init Interstitial

####Create MediationInterstitialHandler
```java
manager = new MediationInterstitialHandler();
```   
#### Set MediationAdapterInitListener 
Need to be called before initialization.

```java
      manager.setMediationAdapterInitListener(new MediationAdapterInitListener() {
     /**
     * Called after the interstitial init success
     */
            @Override
            public void onInitSucceed() {
                Toast.makeText(InterstitialActivity.this,"onInitSucceed",Toast.LENGTH_LONG).show();
                Log.e("interstitial","onInitSucceed");
            }
            
     /**
     * Called after the interstitial init failed
     */

            @Override
            public void onInitFailed() {
                Toast.makeText(InterstitialActivity.this,"onInitFailed",Toast.LENGTH_LONG).show();
                Log.e("interstitial","onInitFailed");
            }
        });
```

####Call init method 

You should configure parameters such as ad id, Adapter absolute Path and timeout in Map when called initialization.       

Sample code:

```java
		 /**
         * @param setTargetClass,There need fill adapter path.		
         * @param TimeOut,load ad timeout
         * @param ("1",mtgAdSource),Set the priority of the ads,"1" is the first call, and the default priority is to request the MTG ads. 
         */

		Map<String,Object> paramsMap = new HashMap<>();
        //IronSource
        AdSource adSource = new AdSource();
        Map<String,Object> ironsourceMap = new HashMap<>();
        ironsourceMap.put("local","xxxxx");//set ironsource AppKey.
        adSource.setLocalParams(ironsourceMap);
        adSource.setTargetClass("com.mintegral.mediation.adapter.iron.IronInterstitialAdapter");     
		adSource.setTimeOut(10000);
		paramsMap.put("2",adSource);
        //MTG
        Map<String,Object> map = new HashMap<>();
        AdSource mtgAdSource = new AdSource();
        map.put(CommonConst.KEY_APPID, "your AppId");
        map.put(CommonConst.KEY_APPKEY, "your AppKey");
        map.put(CommonConst.KEY_INTERSTITIALUNITID, "your unitId");
        map.put(CommonConst.KEY_MUTE, false);//Whether to mute, the default is non-mute.
        mtgAdSource.setLocalParams(map);
        mtgAdSource.setTargetClass("com.mintegral.mediation.adapter.mtg.MTGInterstitialAdapter");
        mtgAdSource.setTimeOut(10000);
        paramsMap.put("1",mtgAdSource);

 	     /**
         * init Interstitial
         */        
		manager.init(this,paramsMap);

```

####Set MediationAdapterInterstitialListener
```java
manager.setMediationAdapterInterstitialListener(new MediationAdapterInterstitialListener() {
		 	 /**
		     * invoked when there is an interstitial has been loaded.
		     */
            @Override
            public void loadSucceed() {
                Toast.makeText(InterstitialActivity.this,"loadSucceed",Toast.LENGTH_LONG).show();
            }
           /**
		     * invoked when there is no Interstitial Ad available after calling load function.
		     */

            @Override
            public void loadFailed(String msg) {
                Toast.makeText(InterstitialActivity.this,"loadFailed:"+msg,Toast.LENGTH_LONG).show();
           /**
		     *  Invoked when the ad was opened and shown successfully.
		     */

            @Override
            public void showSucceed() {
                Toast.makeText(InterstitialActivity.this,"showSucceed:",Toast.LENGTH_LONG).show();
            }
            
		     /**
		     * Invoked when Interstitial ad failed to show. the msg which represents the reason of showInterstitial failure.
		     */

            @Override
            public void showFailed(String msg) {
                Toast.makeText(InterstitialActivity.this,"showFailed:"+msg,Toast.LENGTH_LONG).show();
            }
            /**
		     * Invoked when the end user clicked on the interstitial ad.
		     */

            @Override
            public void clicked(String msg) {
                Toast.makeText(InterstitialActivity.this,"clicked:"+msg,Toast.LENGTH_LONG).show();
            }
            /**
		     *  Invoked when the ad is closed and the user is about to return to the application.
		     */

            @Override
            public void closed() {
                Toast.makeText(InterstitialActivity.this,"closed:",Toast.LENGTH_LONG).show();
            }

        });
```

#### Get the Activity LifecycleListener
Ironsource requires called the method.

```java
lifecycleListener = manager.getLifecycleListener();
```
you can called these method during the lifecycle of the Activity.     
       
```java

	@Override
    protected void onPause() {
        super.onPause();
        if(lifecycleListener != null){
            lifecycleListener.onPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(lifecycleListener != null){
            lifecycleListener.onResume(this);
        }
    }
```


### Load ads
It is recommended that developers preload Adss before displaying them (either during initialization or after closing each ad). This way, it allows more time for the creative material to download and also decreases the amount of wait time for users to see an ad. Use the below method to load and display ads.  

```java
                /**
                 * @param At present you can set to "" 
                 */
                 
                if (mediationInterstitialHandler != null) {
                    mediationInterstitialHandler.load("");
                }
```
### Show ads
```java
                /**
                 * @param At present you can set to "" 
                 */
                 
                if (mediationInterstitialHandler != null) {
                    mediationInterstitialHandler.show("");
                }
```
### Check ads availability
it will return boolean。    

```java
                /**
                 * @param At present you can set to "" 
                 */
                 
                if (mediationInterstitialHandler != null) {
                    mediationInterstitialHandler.isReady("");
                }
```



##Rewarded Video

###Init RewardedVideo
#### Create MediationRewardVideoHandler
```java
manager = new MediationRewardVideoHandler();
```   
#### Set MediationAdapterInitListener 
Need to be called before initialization.

```java
      manager.setMediationAdapterInitListener(new MediationAdapterInitListener() {
     /**
     * Called after the interstitial init success
     */
            @Override
            public void onInitSucceed() {
                Toast.makeText(InterstitialActivity.this,"onInitSucceed",Toast.LENGTH_LONG).show();
                Log.e("interstitial","onInitSucceed");
            }
            
     /**
     * Called after the interstitial init failed
     */

            @Override
            public void onInitFailed() {
                Toast.makeText(InterstitialActivity.this,"onInitFailed",Toast.LENGTH_LONG).show();
                Log.e("interstitial","onInitFailed");
            }
        });
```



####Call the init method

You should configure parameters such as ad id, Adapter absolute Path and timeout in Map when called initialization.
   
Sample code:

```java
		/**
         * @param setTargetClass,There need fill adapter path.		
         * @param TimeOut,load ad timeout
         * @param ("1",mtgAdSource),Set the priority of the ads,"1" is the first call, and the default priority is to request the MTG ads. 
         */

		Map<String,Object> paramsMap = new HashMap<>();
        //IronSource
        AdSource adSource = new AdSource();
        Map<String,Object> ironsourceMap = new HashMap<>();
        ironsourceMap.put("local","xxxxx");//set ironsource AppKey.
        adSource.setLocalParams(ironsourceMap);
        adSource.setTargetClass("com.mintegral.mediation.adapter.iron.IronRewardAdapter");        
        adSource.setTimeOut(10000);
        paramsMap.put("2",adSource);
        //Mintegral
        Map<String,Object> map = new HashMap<>();
        AdSource mtgAdSource = new AdSource();
        map.put(CommonConst.KEY_APPID, "your AppId");
        map.put(CommonConst.KEY_APPKEY, "your AppKey");
        map.put(CommonConst.KEY_REWARDUNITID, "your unitId");
        map.put(CommonConst.KEY_USERID, "your userId");//User ID，set by developer
        map.put(CommonConst.KEY_REWARDID, "your rewardId");//set rewardId as 1 by default
        map.put(CommonConst.KEY_MUTE, false);
        mtgAdSource.setLocalParams(map);
        mtgAdSource.setTargetClass("com.mintegral.mediation.adapter.mtg.MTGRewardAdapter");

        mtgAdSource.setTimeOut(20000);
        paramsMap.put("1",mtgAdSource);
        
 	     /**
         * init RewaredVideo
         */        
        
		manager.init(this,paramsMap);

```


###Set MediationAdapterRewardListener
```java
manager.setMediationAdapterRewardListener(new MediationAdapterRewardListener() {
			 /**
		     * Invoked when there is an interstitial has been loaded.	
		     */

            @Override
            public void loadSucceed() {
                Toast.makeText(RewardActivity.this,"loadSucceed",Toast.LENGTH_LONG).show();
            }

			  /**
		     * Invoked when there is no Interstitial Ad available after calling load function.
		     */

            @Override
            public void loadFailed(String msg) {
                Toast.makeText(RewardActivity.this,"loadFailed:"+msg,Toast.LENGTH_LONG).show();
            }
             /**
			 * Invoked when the ad was opened and shown successfully.
		     */

            @Override
            public void showSucceed() {
                Toast.makeText(RewardActivity.this,"showSucceed:",Toast.LENGTH_LONG).show();
            }
            /**
		     * Invoked when Interstitial ad failed to show. the msg which represents the reason of showInterstitial failure.
		     */

            @Override
            public void showFailed(String msg) {
                Toast.makeText(RewardActivity.this,"showFailed:"+msg,Toast.LENGTH_LONG).show();
            }
            /**
		     * Invoked when the end user clicked on the interstitial ad.
		     */

            @Override
            public void clicked(String msg) {
                Toast.makeText(RewardActivity.this,"clicked:"+msg,Toast.LENGTH_LONG).show();
            }
             /**
		     * Invoked when the ad is closed and the user is about to return to the application.
		     */

            @Override
            public void closed() {
                Toast.makeText(RewardActivity.this,"closed:",Toast.LENGTH_LONG).show();
            }
             /**
		     * Invoked when the user completed the video and should be rewarded.
		     */


            @Override
            public void rewarded(String name, int amount) {
                Toast.makeText(RewardActivity.this,"rewarded:"+name+"-amount:"+amount,Toast.LENGTH_LONG).show();
            }
        });
```
#### Get the Activity LifecycleListener
Ironsource requires called the method.      

```java
lifecycleListener = manager.getLifecycleListener();
```
you can called these method during the lifecycle of the Activity.       
       
```java

	@Override
    protected void onPause() {
        super.onPause();
        if(lifecycleListener != null){
            lifecycleListener.onPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(lifecycleListener != null){
            lifecycleListener.onResume(this);
        }
    }
```


### Load ads
It is recommended that developers preload Adss before displaying them (either during initialization or after closing each ad). This way, it allows more time for the creative material to download and also decreases the amount of wait time for users to see an ad. Use the below method to load and display ads.    

```java
                /**
                 * @param At present you can set to "" 
                 */
                 
                if (mediationRewardVideoHandler != null) {
                    mediationRewardVideoHandler.load("");
                }
```
### Show ads

```java
                /**
                 * @param At present you can set to ""
                 */
                 
                if (mediationRewardVideoHandler != null) {
                    mediationRewardVideoHandler.show("");
                }
```
### Check ads availability
it will return boolean.       

```java
                /**
                 * @param At present you can set to ""
                 */
                 
                if (mediationRewardVideoHandler != null) {
                    mediationRewardVideoHandler.isReady("");
                }
```




## Set Interceptor
You can override the BaseInterceptor class, which is used to set the SDK to request the ad priority, which needs to be called before initialization.

```java
 	 /**
     * Set the interceptor, if not set or set to null, the default will be used our DefaultRewardInterceptor.
     * @param interceptor
     */
    public void setInterceptor(BaseInterceptor interceptor){
        if (interceptor != null) {
            mInterceptor = interceptor;
        }
    }
```
sample code:     

```java

public class TestInterceptor extends BaseInterceptor {  
            @Override 

            public LinkedList<AdSource> onInterceptor(String unitId, Map<String, Object> localParams, String serviceParams) { 
                LinkedList<AdSource> linkedList = new LinkedList<>(); 
                if (localParams != null) { Object o = localParams.get("1"); 
                    if (o instanceof AdSource) { linkedList.add((AdSource) o); } 
                    Object o1 = localParams.get("2"); 
                    if (o1 instanceof AdSource) { linkedList.add((AdSource) o1); } } 
                return linkedList; } 
        }

       /**
         * Called before init 
         */
        
        interceptor_demo = new TestInterceptor();      
        mediationInterstitialHandler.setInterceptor(interceptor_demo);



```




## Error Code
```java
public class MediationMTGErrorCode {


    public static String INTERNAL_ERROR = "INTERNAL_ERROR";
    public static String ADAPTER_CONFIGURATION_ERROR = "ADAPTER_CONFIGURATION_ERROR";
    public static String VIDEO_CACHE_ERROR = "VIDEO_CACHE_ERROR";
    public static String NETWORK_NO_FILL = "NETWORK_NO_FILL";
    public static String ADSOURCE_IS_INVALID = "adsources is invalid";
    public static String NO_CONNECTION = "NO_CONNECTION";
    public static String UNSPECIFIED = "UNSPECIFIED";
    public static String ACTIVITY_IS_NULL= "ACTIVITY_IS_NULL";
    public static String ADSOURCE_IS_TIMEOUT = "ADSOURCE_IS_TIMEOUT";


}
```











		 
		 




 
