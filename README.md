### Motivation
UI Bootstrap has a nice [pagination directive](https://angular-ui.github.io/bootstrap/#/pagination). But it isn't performant when the collection is massive.

azPagination sends a request each time you click a pagination link. This way, you only have to deal with a small chunk of the data at any point in time.

### Overview
If you pass azPagination `http://example.com` as a root endpoint, clicking `3` will send a request to `http://example.com/3` and populate your collection with the collection in the response.

### How to Use
### 1
Include files:
 - `azPagination.js`
 - `azPagination.html`
 - `azPagination.css`

```
<script src='azPagination.js'></script>
<link rel='stylesheet' href='azPagination.css'>
angular.module('myApp', ['azPagination']);
```
You probably will want to improve the styling, and so will probably want to mess with `azPagination.html` and `azPagination.css`.

#### 2
```
<az-pagination
  endpoint-root='http://example.com/people/'
  collection-name='people'
  current-page-number='3'
  number-of-pages-to-show-at-once='3'
>
  <div ng-repeat='person in $parent.people'>
    <!-- stuff -->
  </div>
</az-pagination>
```
Note: We need to use `$parent` because `azPagination` creates an isolate scope that we want access to from our transclusion scope. See [Stack Overflow](http://stackoverflow.com/questions/16171952/access-directives-isolate-scope-from-within-transcluded-content).

#### 3
`http://example.com/people/1` should return a response of the form:
```
{
  people: [], // collection of people; notice that this is the collection-name specified in the directive
  totalPages: 4
}
```

### TODO
1. Add customizations like [UI Bootstrap](https://angular-ui.github.io/bootstrap/#/pagination).
2. Make styling of buttons nicer.
3. Wrap CSS inside something.
