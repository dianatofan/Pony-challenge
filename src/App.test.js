import App from "./App";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import store from "./redux/store";

const shallowMountApp = () =>
  shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("App", () => {
  it("should render", () => {
    const wrapper = shallowMountApp();
    console.log("....", wrapper.html());
    expect(wrapper.find(App).length).toEqual(1);
    // expect(wrapper.find(".app").exists()).toBe(true);
  });
});
