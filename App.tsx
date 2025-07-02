// App.tsx
import AppNavigator from "./navigation/AppNavigator";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return <AppNavigator />;
}
