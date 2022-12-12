import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from './constants';

export async function setRecentData(data) {
  //await AsyncStorage.removeItem(constants.KUSHMAPZ_RECENT_VIEW);
  try {
    if (data) {
      const _sycData = await getRecentData();
      if (_sycData) {
        if (_sycData[data.type]) {
          let find = false;
          let _sdMap = _sycData[data.type];
          _sdMap?.map(item => {
            if (item.id == data?.data?.id) {
              find = true;
            }
          });
          if (find == false) {
            let _sdata = _sycData[data.type];
            _sdata.push(data?.data);
            _sycData[data.type] = _sdata;
          }
        } else {
          _sycData[data.type] = [data?.data];
        }
        await AsyncStorage.setItem(
          constants.KUSHMAPZ_RECENT_VIEW,
          JSON.stringify(_sycData),
        );
      } else {
        await AsyncStorage.setItem(
          constants.KUSHMAPZ_RECENT_VIEW,
          JSON.stringify({
            [data.type]: [data?.data],
          }),
        );
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}

export async function getRecentData() {
  try {
    const _sycData = await AsyncStorage.getItem(constants.KUSHMAPZ_RECENT_VIEW);
    if (_sycData) {
      const dt_ = JSON.parse(_sycData);
      return dt_;
    }
  } catch (ex) {
    console.log(ex);
    return;
  }
}
