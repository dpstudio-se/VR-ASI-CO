/** UPI TF1766→2026 Shield. Historical nodes are provenance; current law is operative. KU21 is preparatory work, not a statute. Model flags are not legal conclusions. */
export type LegalLayer = "HIST" | "CURRENT" | "PREPARATORY_WORK";
export type ShieldStatus = "PASS" | "UPI_FLAG" | "STOP" | "ERR";
export type TfAxisNode = { id:string; year:string; layer:LegalLayer; role:string };
export const TF1766_AXIS: readonly TfAxisNode[] = Object.freeze([
{id:"tf-1766",year:"1766",layer:"HIST",role:"historical root"},
{id:"rf-1809",year:"1809",layer:"HIST",role:"historical constitutional node"},
{id:"tf-1949",year:"1949/50",layer:"HIST",role:"historical TF node"},
{id:"rf-1974",year:"1974/75",layer:"HIST",role:"historical constitutional node"},
{id:"ygl-1991",year:"1991/92",layer:"HIST",role:"historical YGL node"},
{id:"eu-1994",year:"1994/95",layer:"HIST",role:"EU-transfer constitutional history"},
{id:"current-2026",year:"2026",layer:"CURRENT",role:"operative law layer"},
{id:"ku21-1994",year:"1994",layer:"PREPARATORY_WORK",role:"historical preparatory-work node"},]);
export type CurrentRule = {id:string; instrument:"RF"|"TF"|"YGL"; provision:string; topic:string; sourceVersion:"CURRENT"};
export const CURRENT_RULES: readonly CurrentRule[] = Object.freeze([
{id:"rf-1-1",instrument:"RF",provision:"1 kap. 1 §",topic:"folkstyre/offentlig makt",sourceVersion:"CURRENT"},
{id:"rf-1-3",instrument:"RF",provision:"1 kap. 3 §",topic:"grundlagarna",sourceVersion:"CURRENT"},
{id:"rf-10-6",instrument:"RF",provision:"10 kap. 6 §",topic:"EU-överlåtelse/statsskickets grunder",sourceVersion:"CURRENT"},
{id:"tf-1-8",instrument:"TF",provision:"1 kap. 8 §",topic:"förhandsgranskning/hindrande åtgärder",sourceVersion:"CURRENT"},
{id:"ygl-1-11",instrument:"YGL",provision:"1 kap. 11 §",topic:"förhandsgranskning/censur",sourceVersion:"CURRENT"},]);
export type NormTransform = {id:string; articleOrProvision:string; obligation:string; actor:string; effectiveAt:string; mechanism:"PRE_PUBLICATION"|"POST_PUBLICATION"|"ACCESS_CONTROL"|"CONTENT_FILTER"|"OTHER"; medium:string; evidence:string[]};
export type ShieldInput = {norm:NormTransform; mirrorIdentity:boolean; mirrorInverse:boolean; residual:number};
export type ShieldResult = {status:ShieldStatus; reason:string; modelFlag:boolean; legalConclusion:"NOT_DETERMINED"};
export function runTf1766Shield(input:ShieldInput):ShieldResult {
 if(!input.norm.articleOrProvision||!input.norm.actor||!input.norm.effectiveAt||!input.norm.mechanism)return {status:"STOP",reason:"M is underspecified: article, actor, time and mechanism are required.",modelFlag:false,legalConclusion:"NOT_DETERMINED"};
 if(!Number.isFinite(input.residual)||input.residual<0)return {status:"ERR",reason:"Residual must be a finite non-negative model distance.",modelFlag:false,legalConclusion:"NOT_DETERMINED"};
 const modelFlag=!input.mirrorIdentity||!input.mirrorInverse||input.residual!==0;
 return {status:modelFlag?"UPI_FLAG":"PASS",reason:modelFlag?"UPI symmetry deviation detected; legal compatibility remains to be determined from current law and the concrete norm.":"No deviation detected by the declared UPI symmetry model.",modelFlag,legalConclusion:"NOT_DETERMINED"};
}
export function isCurrentLaw(node:TfAxisNode){return node.layer==="CURRENT";}
export function isPreparatoryWork(node:TfAxisNode){return node.layer==="PREPARATORY_WORK";}