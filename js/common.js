var MIGACE = MIGACE || {};

MIGACE.namespace = function(ns_string) {
  var parts = ns_string.split('.'),
      parent = MIGACE,
      i;

  if ('MIGACE' === parts[0]) {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === 'unfefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
}
