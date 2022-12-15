<template>
  <Page actionBarHidden="true">
    <FlexboxLayout
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
    >
      <!-- <Image src="~/components/img/BIG POPA ZONE.png" stretch="none" /> -->
      <Label
        class="main-title"
        text="Добро пожаловать!"
        style="margin-top: 50"
      />
      <Label
        textWrap="true"
        class="descr"
        text="Если вы это читаете, вы скорее всего в офисе IC8 Group."
        style="margin-top: 25"
      />
      <Label
        textWrap="true"
        class="descr"
        text="Нажмите кнопку “Войти”, чтобы получить пропуск."
        style="margin-top: 25"
      />
      <Button
        text="Войти как сотрудник"
        class="button-main"
        style="margin-top: 45"
      />
      <Button
        class="button-secondary"
        style="margin-top: 30; margin-bottom: 30"
        @tap="goToHomePage"
        >Войти как гость</Button
      >
    </FlexboxLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Utils, Device } from "@nativescript/core";
  import Theme from "@nativescript/theme";
  import Home from "@/components/Home.vue";

  Theme.setMode(Theme.Light);

  const wifiScan = Utils.android
    .getApplicationContext()
    .getSystemService(android.content.Context.WIFI_SERVICE)
    .startScan();
  const wifiScanResult = Utils.android
    .getApplicationContext()
    .getSystemService(android.content.Context.WIFI_SERVICE)
    .getScanResults();
  const result: number[] = [];
  for (let i = 0; i < wifiScanResult.size(); i++) {
    result.push(wifiScanResult.get(i).SSID, wifiScanResult.get(i).level);
  }

  export default Vue.extend({
    computed: {
      message() {
        return result;
      },
    },
    methods: {
      goToHomePage() {
        this.$navigateTo(Home);
      },
    },
  });
</script>

<style scoped>
  @font-face {
    font-family: "Jost";
    src: local("Jost"), url("../fonts/Jost.ttf") format("ttf");
    font-weight: 400;
  }
  .main-title {
    font-size: 32px;
    text-align: center;
    font-family: "Jost";
    font-weight: 600;
    color: #000;
  }

  .descr {
    font-size: 18px;
    text-align: center;
    opacity: 0.5;
    color: #000;
    font-family: "Jost";
    font-weight: 400;
    margin-left: 15px;
    margin-right: 15px;
  }

  .button-main {
    background-color: #e70e4c;
    color: #fff;
    font-size: 18px;
    line-height: 26px;
    padding-left: 88px;
    padding-right: 88px;
    padding-top: 14px;
    padding-bottom: 14px;
    font-family: "Jost";
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    border-radius: 50px;
    width: 90%;
    height: 55dpi;
    font-weight: 400;
    opacity: 0.3;
  }

  .button-secondary {
    background-color: #fff;
    color: #e70e4c;
    border: 1px solid #e70e4c;
    font-size: 18px;
    line-height: 26px;
    padding-left: 88px;
    padding-right: 88px;
    padding-top: 14px;
    padding-bottom: 14px;
    font-family: "Jost";
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    border-radius: 50px;
    width: 90%;
    height: 55dpi;
    font-weight: 400;
  }

  Image {
    width: 100%;
    height: 100%s;
  }

  .cont {
    width: 100vw;
    height: 100vh;
  }
</style>
