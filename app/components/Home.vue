<template>
  <Page>
    <ActionBar class="action-bar">
      <Label text="АйСиСтент" class="action-bar__text" />
    </ActionBar>

    <GridLayout class="container">
      <FlexboxLayout class="info" alignItems="center">
        <Label class="icon-wrapper" textAlignment="center">
          <Span class="fas" text.decode="&#xf1eb; " />
        </Label>
        <FlexboxLayout flexDirection="column">
          <Label :text="wifiWithMaxLevel" class="wifi-name" />
          <Label text="• Вы в зоне сети" class="subtext" />
        </FlexboxLayout>
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Utils, Device } from "@nativescript/core";
  import * as geolocation from "@nativescript/geolocation";
  import Theme from "@nativescript/theme";

  Theme.setMode(Theme.Light);

  export default Vue.extend({
    data() {
      return {
        wifiScan: Utils.android
          .getApplicationContext()
          .getSystemService(android.content.Context.WIFI_SERVICE)
          .startScan(),
        wifiScanResult: Utils.android
          .getApplicationContext()
          .getSystemService(android.content.Context.WIFI_SERVICE)
          .getScanResults(),
        wifiLevel: [-100],
        wifiName: [""],
        wifiWithMaxLevel: {},
        maxLevel: -100,
        indexWifiWithMaxLevel: 0,
      };
    },
    methods: {
      setActiveWifi() {
        this.wifiScan = Utils.android
          .getApplicationContext()
          .getSystemService(android.content.Context.WIFI_SERVICE)
          .startScan();
        this.wifiScanResult = Utils.android
          .getApplicationContext()
          .getSystemService(android.content.Context.WIFI_SERVICE)
          .getScanResults();
        for (let i = 0; i < this.wifiScanResult.size(); i++) {
          this.wifiLevel.push(this.wifiScanResult.get(i).level);
          this.wifiName.push(this.wifiScanResult.get(i).SSID);
        }

        this.maxLevel = Math.max(...this.wifiLevel);
        this.indexWifiWithMaxLevel = this.wifiLevel.indexOf(this.maxLevel);
        this.wifiWithMaxLevel = this.wifiName[this.indexWifiWithMaxLevel];
      },
      clearData() {
        this.wifiLevel = [-100];
        this.wifiName = [""];
        this.wifiWithMaxLevel = {};
        this.maxLevel = -100;
        this.indexWifiWithMaxLevel = 0;
      },
    },
    created() {
      geolocation.enableLocationRequest();
      console.log(this.wifiScanResult);
      this.setActiveWifi();

      setInterval(() => {
        this.clearData();
        this.setActiveWifi();
      }, 3000);
    },
  });
</script>

<style scoped lang="scss">
  @import "@nativescript/theme/scss/variables/blue";

  // Custom styles

  Page {
    background-color: #f4f4f4;
  }

  .container {
    padding-left: 10;
    padding-right: 10;
  }
  .fas {
    color: #e70e4c;
    margin-right: 20;
    font-size: 20;
  }
  .subtext {
    color: #e70e4c;
    font-size: 14;
  }

  .icon-wrapper {
    margin-right: 10;
    background-color: rgba(252, 221, 230, 0.3);
    border-radius: 50px;
    width: 54;
    height: 54;
    padding-top: 15;
    padding-left: 6;
  }

  .info {
    background-color: #fff;
    font-size: 16;
    horizontal-align: center;
    margin-top: 10;
    height: 80;
    border-radius: 30;
    padding: 15;
    width: 100%;
    vertical-align: top;
  }

  .action-bar {
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  .action-bar__text {
    font-size: 20;
  }
</style>