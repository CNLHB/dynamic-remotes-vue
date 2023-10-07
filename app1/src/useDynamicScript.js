import {
  reactive,
  defineAsyncComponent,
  toRefs,
  ref,
  watch,
  markRaw,
} from "vue";
function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}
export const useDynamicScript = (args) => {
  const state = reactive({
    ready: false,
    failed: false,
    name: "default",
  });
  const urls = ref(new Map());
  const components = ref(new Map());
  const componentsLoadMap = ref(new Map());

  function setReady(val) {
    state.ready = val;
  }
  function setFailed(val) {
    state.failed = val;
  }
  watch(args, (cur) => {
    if (!cur.url || urls.value.has(cur.url)) {
      initAsyncComponent();
      return;
    }
    if (cur.name) {
      state.name = cur.name;
    }
    const element = document.createElement("script");
    element.src = cur.url;
    element.type = "text/javascript";
    element.async = true;
    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${cur.url}`);
      setReady(true);
      urls.value.set(cur.url, 1);
      initAsyncComponent();
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${cur.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${cur.url}`);
      document.head.removeChild(element);
    };
  });
  function initAsyncComponent() {
    const system = args.value;
    const key = system.scope + system.module;
    if (componentsLoadMap.value.has(key)) {
      components.value.set(state.name, componentsLoadMap.value.get(key));
      return;
    }
    let com = defineAsyncComponent(() =>
      loadComponent(system.scope, system.module)()
    );
    components.value.set(state.name, markRaw(com));
    componentsLoadMap.value.set(key, markRaw(com));
  }
  return {
    ...toRefs(state),
    dynamicComponents: components,
  };
};
