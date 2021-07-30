/** Threat Vector Interface */
interface ThreatVector {
  id: number;
  name: string;
  value: number;
}

/** Risk Calculator */
class Risk {
  threatVector: Array<ThreatVector> = [];

  /**
   * Threat Index - Vector to String
   * Vector is converted to String for easy storage
   * @param {Array<ThreatVector>} - Input Vector of Impact & Likelihood
   *                                (16 parameters)
   * @return {string } String transfornmed from input vector
   */
  vectorToString(vector: Array<ThreatVector>): string {
    // remove brackets
    let result = '(' + vector[0].name + ":" + vector[0].value
    for (let i = 1; i < vector.length; i++) {
      result += '/' + vector[i].name + ':' + vector[i].value
    }
    result += ')';
    return result;
  }

  /**
   * Threat Index - Input String to Vector
   * String is converted to Vector for easy mathematical operation
   * @param {string} inputString - Input string of Impact & Likelihood
   *                                (16 parameters)
   * @return {Array<string> } Vector (Array) transfornmed from input string
   */
  stringToVector(inputString: string): Array<ThreatVector> {
    // Clean Gloabl Array
    this.threatVector.splice(0, this.threatVector.length);
    // remove brackets
    inputString = inputString.replace("(", "").replace(")", "");
    // convert string to vector
    const values = inputString.split("/");

    for (let i = 0; i < values.length; i++) {
      const aux = values[i].split(":");
      const key = aux[0].toUpperCase();
      const value = Number(aux[1]);
      const risk: ThreatVector = { id: i, name: key, value: value };
      this.threatVector.push(risk);
    }
    return this.threatVector;
  }

  /**
  * Threat Index - Vector to JSON
  * Vector is converted to JSON for easy storage
  * @param {Array<ThreatVector>} - Input Vector of Impact & Likelihood
  *                                (16 parameters)
  * @return {string } JSON String transfornmed from input vector
  */
  vectorToJson(vector: Array<ThreatVector>): string {
    const json = JSON.stringify(vector);
    return json;
  }

  /**
 * Threat Index - JSON to Vector
 * Vector is converted to JSON for easy storage
 * @param {string}                -  JSON Input String of Impact & Likelihood
 *                                (16 parameters)
 * @return {Array<ThreatVector> } Array of ThreatVector
 */
  jsonToVector(json: string): Array<ThreatVector> {
    const vector = JSON.parse(json);
    return vector;
  }

  /**
   * Threat Index - Calculate Score
   * Given a vector of 8 values - the functions resturn average value
   * @param {string} riskVector - Input vector of 8 parameters
   * @return {number } returns average score
   */
  calculateAverage(riskVector: ThreatVector[]): string {
    let sum = 0;
    for (let i = 0; i < riskVector.length; i++) {
      sum = sum + riskVector[i].value;
    }
    return (sum / 8.0).toFixed(3);
  }

  /**
   * Threat Index Rating based on Score
   * High the the score - higher the risk
   * @param {number} score - Risk Score
   * @return {string} Risk Rating based on score
   */
  rate(score: number): string {
    switch (true) {
      case score < 0: {
        return "undefined";
      }
      case score == 0: {
        return "Note";
      }
      case score < 3: {
        return "Low";
      }
      case score < 6: {
        return "Medium";
      }
      case score <= 9: {
        return "High";
      }
      default: {
        return "undefined";
      }
    }
  }

  /**
   * Threat Index Criticality based on likelihood and impact
   * High the the score - higher the risk
   * @param {number} likelihood - Likelihood of occurance of the Threat
   * @param {number} impact     - Impact when the Threat Occurs
   * @return {string} Risk Rating based on score
   */
  criticality(likelihood: string, impact: string): string {
    likelihood = likelihood.toUpperCase();
    impact = impact.toUpperCase();
    switch (true) {
      case likelihood == "LOW" && impact == "LOW": {
        return "NOTE";
      }
      // LOW
      case likelihood == "LOW" && impact == "MEDIUM": {
        return "LOW";
      }
      case likelihood == "MEDIUM" && impact == "LOW": {
        return "LOW";
      }
      // MEDIUM
      case likelihood == "LOW" && impact == "HIGH": {
        return "MEDIUM";
      }
      case likelihood == "MEDIUM" && impact == "MEDIUM": {
        return "MEDIUM";
      }
      case likelihood == "HIGH" && impact == "LOW": {
        return "MEDIUM";
      }
      // HIGH
      case likelihood == "HIGH" && impact == "MEDIUM": {
        return "HIGH";
      }
      case likelihood == "MEDIUM" && impact == "HIGH": {
        return "HIGH";
      }
      // CRITICAL
      case likelihood == "HIGH" && impact == "HIGH": {
        return "CRITICAL";
      }
      default: {
        return "undefined";
      }
    }
  }

  /**
   * Threat Index Criticality Colour
   * Based on Label
   * @param {string} label - Lable - CRITICAL, HIGH, MEDIUM, LOW
   * @return {string} Color for the Label
   */
  colour(label: string): string {
    label = label.toUpperCase();
    const colors = [
      "rgba(255, 102, 255)",
      "rgba(255, 0, 0)",
      "rgba(255, 169, 0)",
      "rgba(255, 255, 0)",
      "rgba(144, 238, 144)",
    ];

    switch (true) {
      default:
        return colors[4];
      case label == "LOW":
        return colors[3];
      case label == "MEDIUM":
        return colors[2];
      case label == "HIGH":
        return colors[1];
      case label == "CRITICAL":
        return colors[0];
    }
  }
}
export default new Risk();
