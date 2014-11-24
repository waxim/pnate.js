/**
 * Pnate.js - Pagination Anywhere
 *
 * Will take a collection of elements
 * and provide paginate options.
 *
 * @author Alan Cole <me@alancole.io>
 * @licence MIT
 *
*/

;(function(){

  'use strict'

  var pnate = function(){

      // Firstly, We need jQuery
      if(!jQuery()){ throw new Error('Sorry, jQuery is needed to use this lib.'); }


      // Set all our option values
      this.options = {};
      this.options.eleSearch = 'ul.li';
      this.options.limit =  10;
      this.options.nextText = 'Next Page';
      this.options.prevText = 'Previous Page';
      this.options.addButtons = 0;

      // Set place holder arrays
      this.elements = [];
      this.segments = [];
      this.parent = '';

      // Set html templates
      this.nextButton = '<a class="btn next">' + this.options.nextText + '</a>';
      this.prevButton = '<a class="btn previous">' + this.options.prevText + '</a>';
      this.buttons = '<div class="pagination buttons">' + this.prevButton + '' + this.nextButton + '</div>';

      // Set is active
      this.active = 0;

      /**
       * set() sets an option value
       *
       * @param <String> option
       * @param <String> value
       * @return <String> value
      */
      this.set = function(what, to){
        this.options[what] = to;
        return to;
      }

      /**
       * get() gets an option value
       *
       * @param <String> option
       * @return <String> value|null
      */
      this.get = function(what){
        if(typeof this.options[what] !== 'undefined'){
          return this.options[what];
        } else { return null; }
      }

      /**
       * _collectElements() gets elements to page
       * also sets our parent container.
       *
       * @return <Array> elements
      */
      this._collectElements = function(){
        this.elements = jQuery(this.options.eleSearch);
        this.parent = jQuery(this.options.eleSearch).parent();
        return this.elements;
      }

      /**
       * _chunkElements() splits elements in to chunks
       *
       * @return <Bool> true|false
      */
      this._chunkElements = function(){
        if(this.elements.length > 0){
          while(this.elements.length > 0){
            this.segments.push(this.elements.splice(0, this.options.limit));
          }
        }
        return true;
      }

      /**
       * hideBatch() hides all elements
       * in a given batch
       *
       * @param <String> index
       * @return <Bool> true
      */
      this.hideBatch = function(index){
        if(typeof this.segments[index] !== 'undefined'){
          this.segments[index].each(function(s){
            s.hide();
          });
        }
        return true;
      }

      /**
       * hideAll() hides all elements
       * in all batches
       *
       * @return <Bool> true
      */
      this.hideAll = function(index){
        var i = 0;
        if(this.segments.length > 0){
          while(i < this.segments.length){
            this.hideBatch(i);
            i++;
          }
        }
      }

      /**
       * showBacth() shows all elements
       * in a given batch
       *
       * @param <String> index
       * @return <Bool> true
      */
      this.showBatch = function(index){
        if(typeof this.segments[index] !== 'undefined'){
          this.segments[index].each(function(s){
            s.show();
          });
        }
      }

      /**
       * next() shows next batch
       *
       * @return <Bool> true
      */
      this.next = function(){
        if((this.active+1) < this.segments.length){
          this.hideBatch(this.active);
          this.showBatch(this.active+1);
          this.active = this.active+1;
        }

        return true;
      }

      /**
       * previous() shows previous batch
       *
       * @return <Bool> true
      */
      this.previous = function(){
        if(this.active > 0){
          this.hideBatch(this.active);
          this.showBatch(this.active-1);
          this.active = this.active-1;
        }

        return true;
      }

      /**
       * jumpTo() shows a given batch
       *
       * @param <String> batch
       * @return <Bool> true
      */
      this.jumpTo = function(index){
        this.hideBatch(this.active);
        this.showBatch(index);
        this.active = index;

        return true;
      }

      /**
       * _appendButtons() adds buttons to
       * elements parent
       *
       * @return <Bool> true
      */
      this._appendButtons = function(){
        jQuery(this.parent).append(this.buttons);
      }

      /**
       * init() start pagination
       *
       * @return <Bool> true
      */
      this.init = function(){
        this._collectElements();
        this._chunkElements();
        
        if(this.options.addButtons){
          this._appendButtons();
        }

        this.hideAll();
        this.jumpTo(0);
        return true;
      }


  }

  window.Pnate = pnate;

})();
