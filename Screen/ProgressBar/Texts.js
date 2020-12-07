import React from 'react';
import LoopText from 'react-native-loop-text';

export default function Text() {
  return (
    <LoopText
      style={{
        fontSize: 21,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 50,
      }}
      delay={4000}
      textArray={[
        '딥러닝, AI 기술을 통해 사진을 합성중입니다!',
        '고화질 사진이라면 더 좋은 결과가 나온다는 사실!',
        '증명사진이라면 더 좋은 결과가 나올지도 몰라요!',
        '2인용 사진은 tip 버튼을 참고해주세요!',
        '눈이 너무 작으면 오류가 나올 수 있어요! ㅜㅜ',
      ]}
    />
  );
}
