/**
 * Create a new instantiate function
 * @param  {Object}   params The parameters to use to create new instances
 * @return {Function}        The instantiate function
 */
function instantiate(params) {
  /**
   * Use the factory function with the given params to create a new instance
   * @param  {String}   name    The factory name
   * @param  {Function} factory The factory function
   * @return {Array}            The factory name and the created instance
   */
  return async ([name, factory]) => [name, await factory(params)];
}

module.exports = instantiate;
