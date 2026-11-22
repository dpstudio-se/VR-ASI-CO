# UPI Gen2 cross-links

Store typed, provenance-backed links between UPI Persona and UPI Fysik records.

Each link must state direction, relation type, source record IDs, context, evidence, confidence basis, counterexamples, review state and timestamp. Distinguish:
- `OBSERVATION_SUGGESTS`: persona experience suggests a physics question;
- `MODEL_EXPLAINS`: a physics model offers a candidate explanation for an observation;
- `CORRELATES_WITH`: observed association without causal claim;
- `CONTRADICTS`: evidence or model conflict;
- `VALIDATED_IN_CONTEXT`: independently reviewed within a defined scope.

Never infer causation from correlation or promote a link solely because it recurs.
