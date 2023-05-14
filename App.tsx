import { Navigation } from '@/app/navigation';
import { queryClient } from '@/shared/react-query/query-client';
import { ToastsContainer } from '@/shared/ui/toast/instance';
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <View style={styles.Container}>
        <StatusBar
            barStyle={'dark-content'}
            translucent={true}
            backgroundColor={'transparent'}
          />
          <Provider>
            <Navigation />
            <ToastsContainer />
          </Provider>
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    width,
    height: '100%',
    backgroundColor: '#fff',
  },
});
