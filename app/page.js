import Main from "@/components/Main";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    //这种写法，hero这个component就是Main的props参数，作为子类传入到Main.js中
    //用component替代html中的tag
    //其他页面需要Main的时候就可以复用，而无需重写main逻辑
    <Main >
      <Hero/>
    </Main>
  );
}
