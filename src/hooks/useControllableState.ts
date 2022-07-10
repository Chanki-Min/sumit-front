import type { SetStateAction } from "react";
import { useCallback, useState } from "react";

type UseControllableStateProp<T> = {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
};

/**
 * valueOrFn이 함수일 경우 실행한 값을 반환하고, 아닌 경우 그대로 반환한다
 *
 * @param valueOrFn 값 또는 값을 반환하는 함수
 * @param args 함수일 경우 전달할 매개변수
 * @returns value 또는 value에 args를 전달하여 실행한 평가값
 */
function runIfFunctionElseVaule<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return valueOrFn instanceof Function ? valueOrFn(...args) : valueOrFn;
}

/**
 * 주어진 인자에 따라 비제어/제어 상태를 반환한다
 *
 * @params prop.defaultValue : 비제어 상태로 동작할 경우 사용될 기본 상태값
 * @params prop.value : 제어 상태로 동작할 경우 해당 제어 상태의 값
 * @params prop.onChange : 제어 상태로 동작할 경우 해당 제어 상태를 변화시키는 dispatcher
 * @returns [state, state-dispatch-function] tuple
 */
const useControllableState = <StateType>(
  prop: UseControllableStateProp<StateType>
): [StateType, React.Dispatch<React.SetStateAction<StateType>>] => {
  const { value, defaultValue, onChange: onChangeProp } = prop;
  const onChange = useCallback(
    (nextState: StateType) => {
      onChangeProp?.(nextState);
    },
    [onChangeProp]
  );

  // 비제어 상태로 동작할 경우 이용할 내부 상태 정의
  const [stateValue, setStateValue] = useState(defaultValue as StateType);

  const isControlled = typeof value !== "undefined"; // props.value가 존재하지 않을 경우 내부 상태로 간주한다.
  const presentState = isControlled ? value : stateValue; // 비제어/제어 상황에 따른 실제 반환할 상태값

  // 비제어 상태일 경우 내부 상태를, 제어 상태일 경우 외부 상태를 변경하는 함수 (dispatcher)
  const updateState = useCallback(
    (next: SetStateAction<StateType>) => {
      const nextState = runIfFunctionElseVaule(next, presentState); // next가 콜백이거나 값일 경우를 인라인 처리

      if (!isControlled) {
        setStateValue(nextState);
      }
      onChange(nextState);
    },
    [presentState, isControlled, onChange]
  );

  return [presentState, updateState];
};

export default useControllableState;
