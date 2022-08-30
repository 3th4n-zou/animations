/**
 *
 *
 * @param {number} curT
 * @param {number} startP
 * @param {number} endP
 * @param {number} _t
 * @return {*}  {number}
 */
function linear(curT: number, startP: number, endP: number, _t: number): number {
  let journey = endP - startP;

  return (journey / _t) * curT + startP;
}



export default linear;
