import risk from "../src/risk";

describe("Threat Index Risk Rating based on Risk Score", () => {
  describe.each`
    score | rating
    ${-1} | ${"undefined"}
    ${0}  | ${"Note"}
    ${2}  | ${"Low"}
    ${3}  | ${"Medium"}
    ${5}  | ${"Medium"}
    ${6}  | ${"High"}
    ${9}  | ${"High"}
    ${10} | ${"undefined"}
  `("$score", ({ score, rating }) => {
    test.concurrent(`risk rating for
                                    score ${score}
                                    is ${rating}`, () => {
      expect(risk.rate(score)).toBe(rating);
    });
  });
});

describe("Threat Index Risk criticality based on likelihood and impact", () => {
  describe.each`
    likelihood   | impact       | criticality
    ${"LOW"}     | ${"LOW"}     | ${"NOTE"}
    ${"LOW"}     | ${"MEDIUM"}  | ${"LOW"}
    ${"MEDIUM"}  | ${"LOW"}     | ${"LOW"}
    ${"LOW"}     | ${"HIGH"}    | ${"MEDIUM"}
    ${"MEDIUM"}  | ${"MEDIUM"}  | ${"MEDIUM"}
    ${"HIGH"}    | ${"LOW"}     | ${"MEDIUM"}
    ${"HIGH"}    | ${"MEDIUM"}  | ${"HIGH"}
    ${"MEDIUM"}  | ${"HIGH"}    | ${"HIGH"}
    ${"HIGH"}    | ${"HIGH"}    | ${"CRITICAL"}
    ${"Invalid"} | ${"Invalid"} | ${"undefined"}
  `("$criticality", ({ likelihood, impact, criticality }) => {
    test.concurrent(
      `risk criticality for
                      likelihood ${likelihood} and impaact ${impact}
                      is ${criticality}`,
      () => {
        expect(risk.criticality(likelihood, impact)).toBe(criticality);
      }
    );
  });
});

describe("Threat Index ", () => {
  const T1 =
    "(SL:1/M:1/O:0/S:2/ED:1/EE:1/A:1/ID:2/LC:2/LI:1/LAV:1/LAC:1/FD:1/RD:1/NC:2/PV:3)";
  const T2 =
    "(SL:9/M:9/O:9/S:2/ED:9/EE:9/A:9/ID:9/LC:9/LI:9/LAV:1/LAC:9/FD:1/RD:1/NC:2/PV:9)";
  const T3 =
    "(SL:9/M:9/O:4/S:2/ED:9/EE:3/A:6/ID:5/LC:6/LI:5/LAV:5/LAC:9/FD:3/RD:5/NC:5/PV:5)";
  const T4 =
    "(SL:9/M:9/O:9/S:2/ED:9/EE:9/A:9/ID:9/LC:9/LI:9/LAV:1/LAC:9/FD:9/RD:9/NC:9/PV:9)";
  describe.each`
    inputString | wantLikelihoodScore | wantLikelihoodLabel | wantImpactScore | wantImpactLabel | wantCriticality
    ${T1}       | ${"1.125"}          | ${"Low"}            | ${"1.500"}      | ${"Low"}        | ${"NOTE"}
    ${T2}       | ${"8.125"}          | ${"High"}           | ${"5.125"}      | ${"Medium"}     | ${"HIGH"}
    ${T3}       | ${"5.875"}          | ${"Medium"}         | ${"5.375"}      | ${"Medium"}     | ${"MEDIUM"}
    ${T4}       | ${"8.125"}          | ${"High"}           | ${"8.000"}      | ${"High"}       | ${"CRITICAL"}
  `(
    "$inputString",
    ({
      inputString,
      wantLikelihoodScore,
      wantLikelihoodLabel,
      wantImpactScore,
      wantImpactLabel,
      wantCriticality,
    }) => {
      test.concurrent(
        `Threat Index for
                        string ${inputString}
                        Likelihood Score is ${wantLikelihoodScore}
                        Likelihood Label is ${wantLikelihoodLabel}
                        Impact Score is ${wantImpactScore}
                        Impcat Label is is ${wantImpactLabel}
                        Overall Risk Score is ${wantCriticality}`,
        () => {
          const vector = risk.stringToVector(inputString);
          // Check likelihood Score
          const likelihood = risk.calculateAverage(vector.slice(0, 8));
          expect(likelihood).toBe(wantLikelihoodScore);
          const likelihoodLabel = risk.rate(Number(likelihood));
          expect(likelihoodLabel).toBe(wantLikelihoodLabel);
          // Check Impact Score
          const impact = risk.calculateAverage(vector.slice(8, 16));
          expect(impact).toBe(wantImpactScore);
          const impactLabel = risk.rate(Number(impact));
          expect(impactLabel).toBe(wantImpactLabel);
          const criticality = risk.criticality(likelihoodLabel, impactLabel);
          expect(criticality).toBe(wantCriticality);
        }
      );
    }
  );
});

describe("Threat Index String to Vector to JSON to Vector to String", () => {
  const T1 =
    "(SL:1/M:1/O:0/S:2/ED:1/EE:1/A:1/ID:2/LC:2/LI:1/LAV:1/LAC:1/FD:1/RD:1/NC:2/PV:3)";
  const T2 =
    "(SL:9/M:9/O:9/S:2/ED:9/EE:9/A:9/ID:9/LC:9/LI:9/LAV:1/LAC:9/FD:1/RD:1/NC:2/PV:9)";
  const T3 =
    "(SL:9/M:9/O:4/S:2/ED:9/EE:3/A:6/ID:5/LC:6/LI:5/LAV:5/LAC:9/FD:3/RD:5/NC:5/PV:5)";
  const T4 =
    "(SL:9/M:9/O:9/S:2/ED:9/EE:9/A:9/ID:9/LC:9/LI:9/LAV:1/LAC:9/FD:9/RD:9/NC:9/PV:9)";
  const T5 =
    "(SL:9/M:9/O:9/S:)";
  describe.each`
    threatVectorString | result
    ${T1}              | ${true}
    ${T2}              | ${true}
    ${T3}              | ${true}
    ${T4}              | ${true}
    ${T5}              | ${false}
  `("$threatVectorString", ({ threatVectorString, result }) => {
    test.concurrent(
      `String -> Vector -> JSON -> Vector -> String
                                    for ${threatVectorString}
                                    is ${result}`, () => {
      const vector = risk.stringToVector(threatVectorString);
      const json = risk.vectorToJson(vector)
      const gotVector = risk.jsonToVector(json)
      const gotString = risk.vectorToString(gotVector)
      let expected = (gotString == threatVectorString)
      expect(expected).toBe(result);
    });
  });
});

describe("Threat Index Risk Rating Colour based on Label", () => {
  describe.each`
    label         | wantedColour
    ${"CRITICAL"} | ${"rgba(255, 102, 255)"}
    ${"HIGH"}     | ${"rgba(255, 0, 0)"}
    ${"MEDIUM"}   | ${"rgba(255, 169, 0)"}
    ${"LOW"}      | ${"rgba(255, 255, 0)"}
    ${"INVALID"}  | ${"rgba(144, 238, 144)"}
  `("$label", ({ label, wantedColour }) => {
    test.concurrent(
      `Colour for Label ${label}
                              is ${wantedColour}`,
      () => {
        expect(risk.colour(label)).toBe(wantedColour);
      }
    );
  });
});
