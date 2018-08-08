


    	var path = $(location).attr('pathname');
    	var productData;
    	var filters = [];
    	filters['category'] = [];
	    filters['room'] = [];
	    filters['color'] = [];
	    filters['design'] = [];
    	
		if(path != "/"){
			var url = path.split('/');
			changePage(url[1], url[2]);
		}else{
			changePage("domov","");
		}


		$("#domov a").on("click", function(event){
			event.preventDefault();
			var elementPath = $(this).attr('href').split('/');
			changePage(elementPath[0],elementPath[1]);
		})

		$(".homepage").on("click", function(event){
			event.preventDefault();
			changePage("domov","");
		})

		$("form button").on("click", function(event){
			event.preventDefault();
		})



		$("#popup-overlay").on("click", function(event){
			closePopup();
		})



function changePage(page, nameid) {
	if(page == "produkt"){
		id = nameid.toLowerCase();

		var data = {
	      "name": nameid
	    };
	    data = $(this).serialize() + "&" + $.param(data);
	    
	    $.ajax({
	      type: "POST",
	      dataType: "json",
	      url: "/inc/product.php",
	      data: data,
	      success: function(data) {
	      	productData = data;
	      	productData['selected-material'] = 0;
	      	productData['selected-shipping'] = 0;

	        $('#product-name h1').text(data['name']);
	        $('#product-image').html('<img src="/img/' + data['img'] + '" alt="' + data['name'] + '" />');
			$('#product-description').html(data['description']);
			$('#product-short-information').html(data['short_information']);


			$('#product-size').text(getSquareSize());

			if(Object.keys(data['materials']).length > 0){
				selectMaterial(getFirstKey(data['materials']));
			}
			selectShipping(0);
			selectInstallation(0);
			selectFinalisation();
			updatePriceCalculation();


			$('#produkt .box-custom-color').each(function(i) {
				if($(this).hasClass('color-half')){
					$(this).css('background', 'linear-gradient(to right, #' + data['color'] + ' 50%, ' + LightenDarkenColor('#' + data['color'], -10) + ' 50%');
				}else if($(this).hasClass('color-darker')){
					$(this).css('background-color', LightenDarkenColor('#' + data['color'], -10));
				}else if($(this).hasClass('color-dark')){
					$(this).css('background-color', LightenDarkenColor('#' + data['color'], -20));
				}else{
					$(this).css('background-color', '#' + data['color']);
				}
			});

			
			var data_labels = [];
			var data_values = [];

			$.each( data['prices'], function( key, value ) {
			  	data_labels.push(key);
			  	data_values.push(value);
			});

			$('#produkt button').each(function(i) {
				if(!$(this).hasClass('btn-menu')){
					$(this).css('background-color', '#' + data['color']);
				}
			});
			

			$('.btn-color').each(function(i) {
				$(this).css('background-color', '#' + data['color']);
			});
			
			$('#produkt button>span').each(function(i) {
				$(this).css('background-color', LightenDarkenColor('#' + data['color'], -20));
			});
			
			$('.btn-color>span').each(function(i) {
				$(this).css('background-color', LightenDarkenColor('#' + data['color'], -20));
			});

			var ctx = document.getElementById("product-chart").getContext('2d');
			var pChart = new Chart(ctx, {
			    type: 'line',
			    data: {
			        labels: data_labels,
			        datasets: [{
			            label: '',
			            data: data_values,
			            backgroundColor: [
			                'rgba(196, 28, 114, 0.5)',
			            ],
			            borderColor: [
			                'rgba(158,31,99,1)',
			            ],
			            borderWidth: 1
			        }]
			    },
			    fill: true,
			    pointRadius: [2, 4, 6, 18, 0, 12, 20],
			    options: {
			        responsive: true,
			        legend: {
			            display: false,
			        },
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					gridLines: {
						display: true,
						drawBorder: true,
						drawOnChartArea: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'm2'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Cena'
							},
							ticks: {
			                    beginAtZero:false
			                }
						}]
					}
			    }
			});
	      }
	    });
	}else if(page == "inspiracia"){
	    $.ajax({
	      type: "POST",
	      dataType: "json",
	      url: "/inc/inspiration.php",
	      success: function(data) {
	      	$.each( data, function(key, value) {
	      		if ((key+1) % 4 === 0 || (key+1) % 4 === 1) { 
	      			color = 9;
	      		}else{
	      			if ((key+1) % 4 === 2) { 
	      				color = 10;
	      			}else{
	      				color = 11;
	      			}
	      		}

	      		$.each(value['attributes'], function(keyattr, valueattr) {
	      			if(jQuery.inArray(valueattr['name'] + ':' + valueattr['img'], filters[valueattr['attribute']]) < 0){
	      				filters[valueattr['attribute']].push(valueattr['name'] + ':' + valueattr['img']);
	      			}	

      				if(value[valueattr['attribute']] === undefined){
      					value[valueattr['attribute']] = valueattr['name'];
      				}else{
      					value[valueattr['attribute']] = value[valueattr['attribute']] + ';' + valueattr['name'];
      				}
	      		});

	      		if(value['category'] === undefined){
	      			value['category'] = "";
	      		}

	      		if(value['room'] === undefined){
	      			value['room'] = "";
	      		}

	      		if(value['color'] === undefined){
	      			value['color'] = "";
	      		}

  				$('#inspiration-container').append('<div data-category="' + value['category'] + '" data-room="' + value['room'] + '" data-color="' + value['color'] + '" class="col-md-6 col-sm-6 col-xs-12 box box-double box-color-' + color + '"><div class="box-content box-image"><img src="/img/' + value['img'] + '" alt="' + value['name'] + '" /></div></div>');
			});
	      }
	    });
	}else if(page == "blog"){
		if(nameid === undefined){
			$.ajax({
		      type: "POST",
		      dataType: "json",
		      url: "/inc/blog.php",
		      success: function(data) {
		      	$('#blog-container').text('');
		      	$.each( data, function( key, value ) {
		      		if ((key+1) % 2 === 1) { 
		      			color = "9-10";
		      		}else{
		      			color = "11-9";
		      		}


		      		$.each(value['attributes'], function(keyattr, valueattr) {
		      			if(jQuery.inArray(valueattr['name'] + ':' + valueattr['img'], filters[valueattr['attribute']]) < 0){
		      				filters[valueattr['attribute']].push(valueattr['name'] + ':' + valueattr['img']);
		      			}	

	      				if(value[valueattr['attribute']] === undefined){
	      					value[valueattr['attribute']] = valueattr['name'];
	      				}else{
	      					value[valueattr['attribute']] = value[valueattr['attribute']] + ';' + valueattr['name'];
	      				}
		      		});

		      		if(value['category'] === undefined){
		      			value['category'] = "";
		      		}

		      		if(value['room'] === undefined){
		      			value['room'] = "";
		      		}

		      		if(value['color'] === undefined){
		      			value['color'] = "";
		      		}

	  				// $('#blog-container').append('<div data-category="' + value['category'] + '" data-room="' + value['room'] + '" data-color="' + value['color'] + '" class="col-md-6 col-sm-6 col-xs-12 box href-box box-color-' + colorLeft + '" onClick="changePage(\'blog\',\'' + value['name'] + '\');"><div class="box-content"><h1>' + value['name'] + '</h1><p>' + value['short_content'] + '</p></div></div><div class="col-md-6 col-sm-6 col-xs-12 box href-box box-color-' + colorRight + '" onClick="changePage(\'blog\',\'' + value['name'] + '\');"><div class="box-content box-image"><img src="/img/' + value['img'] + '" alt="' + value['name'] + '" /></div></div>');
	  				$('#blog-container').append('<div data-category="' + value['category'] + '" data-room="' + value['room'] + '" data-color="' + value['color'] + '" class="col-md-12 col-sm-12 col-xs-12 box href-box box-color-half-' + color + ' double-column" onClick="changePage(\'blog\',\'' + value['name'] + '\');"><div class="row"><div class="col-sm-6 box-padding"><h1>' + value['name'] + '</h1><p>' + value['short_content'] + '</p></div><div class="col-sm-6 box-image box-padding"><img src="/img/' + value['img'] + '" alt="' + value['name'] + '" /></div></div></div>')
				});
		      }
		    });
		}else{
			id = nameid.toLowerCase();
		    page = "blog-clanok";

		    $.ajax({
		      type: "GET",
		      dataType: "json",
		      url: "/inc/blog.php?name="+nameid,
		      success: function(data) {
		      	$('#blog-name').text(data['name']);
		      	$('#blog-long-content').html(data['long_content']);
		      	$('#blog-short-content').html(data['short_content']);
		      	$('#blog-image').html('<img src="/img/' + data['img'] + '" alt="' + data['name'] + '" />');
		      	
		      	var filter = '';
		      	$.each(data['filters'], function(key, value) {
		      		if(key > 0){
		      			filter += '&';	
		      		}else{
		      			filter += '?';	
		      		}
		      		filter += 'filter[]='+value['filter_id'];
		      	});
		      	
		      	$.ajax({
			      type: "GET",
			      dataType: "json",
			      url: "/inc/inspiration.php"+filter,
			      success: function(data) {
			      	var inspiration = data[Math.floor(Math.random() * data.length)]
			      	$('#blog-inspire-image').html('<img src="/img/' + inspiration['img'] + '" alt="' + inspiration['name'] + '" />');
			      }
			    });
		      }
		    });
		}
	}

	$('.subpage.active .box').each(function(i) {
		$(this).fadeTo( Math.floor((Math.random() * 2000) + 200), 0);
	});

	if($('.subpage.active').length == 0){
		$('.subpage#domov').addClass("active");
	}

	$('.subpage.active').fadeOut(1000, function(){
		$('#' + page + ' .box').each(function(i) {
			$(this).css('display', 'none');
		});
		$("#" + page).fadeIn(500, function(){
			$('.subpage.active').removeClass('active');
			$("#" + page).addClass('active');
			$('#' + page + ' .box').each(function(i) {
				$(this).fadeTo( Math.floor((Math.random() * 2000) + 200), 1);
				resizeBox($(this));
			});
		});
	});
}

function resizeBox(element){
	if(element.hasClass('col-sm-8') || element.hasClass('box-menu') || element.hasClass('double-column')){
		height = element.outerWidth()/2;
	}else if(element.hasClass('triple-column')){
		height = element.outerWidth()/3;
	}else{
		height = element.outerWidth();
	}

	if(element.parent().is("#inspiration-container") || element.parent().is("#blog-container")){
		element.parent().css('max-height', height*3 + 'px');
	}

	element.css('height', height + 'px');
	if(element.closest("#popup").length > 0){
		$('#popup-container').css('margin-left', -$('#popup-container').outerWidth()/2);
		$('#popup-container').css('margin-top', -$('#popup-container').outerHeight()/2);
	}
}

function adjustPageContainer(){
	var container = $('body>.vertical-center>.container');
	if (container.height() > window.innerHeight){
		container.css('max-width', window.innerHeight - 50 + 'px');
	}else{
		container.css('max-width', 'initial');
	}
}

function calculatePrice(price_table){
	squaresize = getSquareSize();
	if(price_table[squaresize] !== undefined){
		return price_table[squaresize];
	}else{
		var max = 0;
		var min = Infinity;
		$.each(price_table, function(key, value) {
			key = parseFloat(key);
			if(key > max){
				max = key;
			}

			if(key < min){
				min = key;
			}
		});
		if(squaresize > max){
			return price_table[max];
		}else if(squaresize < min){
			return price_table[min];
		}else{
			var lower = 0;
			var greater = Infinity;
			$.each(price_table, function(key, value) {
				key = parseFloat(key);
				if(key > squaresize){
					if(key < greater){
						greater = key;
					}
				}

				if(key < squaresize){
					if(key > lower){
						lower = key;
					}
				}
			});

			diff = price_table[lower] - price_table[greater];
			div = diff/(greater-lower);
			return price_table[lower] - div*(squaresize - lower);
		}
	}
}

function getSquareSize(){
	return $('#input-width').val() * $('#input-height').val();
}

function updatePriceCalculation(){
	var squareSize = getSquareSize();
	var pricePerSquare = parseFloat(calculatePrice(productData['prices'])).toFixed(2);
	if($('#material-price').val().length > 0){
		 pricePerSquare += parseFloat($('#material-price').val()).toFixed(2);
	}
	var priceInstallation = squaresize*parseFloat($('#product-installation').text());
	var priceFinalisation = squaresize*parseFloat($('#product-finalisation').text());
	var priceShipping = parseFloat($('#product-shipping').text()).toFixed(2);

	var totalPrice = (squareSize*pricePerSquare + priceInstallation + priceFinalisation).toFixed(2);
	$('#product-price-piece').text(totalPrice);

	var quantity = parseInt($('#input-quantity').val());
	var discount = 0;

	$.each(productData['quantity_discount'], function(key, value) {
		key = parseInt(key);
		value = parseFloat(value);
      	if(quantity >= key && discount < value){
      		discount = value;
      	}
	});

	totalPrice = (totalPrice * quantity).toFixed(2);
	if(discount > 0){
		totalPrice = (totalPrice*(100-discount)/100).toFixed(2);
		$('#product-discount').text(discount);
		$('#product-discount').parent().show();
	}else{
		$('#product-discount').text(0);
		$('#product-discount').parent().hide();
	}

	totalPrice = (parseFloat(totalPrice) + parseFloat(priceShipping)).toFixed(2);


	$('#product-size').text(squareSize);
	$('#product-price').text(pricePerSquare);
	$('#product-price-total').text(totalPrice);
	$('#product-price-total-tax-free').text((totalPrice/1.2).toFixed(2));
}

function openPopup(data){
	var scrollPosition = [
	  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
	  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
	];

	$('#popup-container').html(data);
	$('#popup').css('left', scrollPosition[0]);
	$('#popup').css('top', scrollPosition[1]);
	$('#popup').fadeIn(500);
	$('#popup-container').css('margin-left', -$('#popup-container').outerWidth()/2);
	$('#popup-container').css('margin-top', -$('#popup-container').outerHeight()/2);
	$('#popup-container').css('top', '50%');
	$('#popup-container').css('left', '50%');
	$('html').css('overflow', 'hidden');

	$('#popup-container button').each(function(i) {
		$(this).css('background-color', '#' + productData['color']);
	});

	$('#popup-container .btn-color').each(function(i) {
		$(this).css('background-color', '#' + productData['color']);
	});
	
	$('#popup .popup-box').each(function(i) {
				resizeBox($(this));
			});
}

function closePopup(data){
	$('#popup').fadeOut(500);
	$('html').css('overflow', 'scroll');
}

function openMaterialSelection(){
	var data = '<div class="row"><div class="col-sm-3 popup-box box-content-center" style="background-color: #' + productData['color'] + ';">Druh Materiálu</div><div class="col-sm-9"> ipsum</div></div><div class="row">';
	$.each(productData['materials'], function( index, value ){
	    data += '<div class="col-sm-3 popup-box href-box" onClick="selectMaterial(' + value['id'] + ');" style="background-image: url(/img/' + value['img'] + ');"></div>';
	});
	
	var boxes = Object.keys(productData['materials']).length;
	var remainingBoxes = 0;
	if(boxes > 4){
		remainingBoxes = boxes % 4;
	}else{
		remainingBoxes = 4 - boxes;
	}
	
	for (i = 1; i <= remainingBoxes; i++) { 
		data += '<div class="col-sm-3 popup-box dummy-box"></div>';	
	}
	 
	data += '</div>';
	openPopup(data);
}

function openFilterSelection(attribute){
	var data = '<div class="row">';
	data += '<div class="col-sm-3 popup-box box" style="background-image: url(/img/filters/all.png);" onClick="selectFilter(\''+ attribute + '\',\'Všetko\');" id="filter-vsetko">Všetko</div>';
	$.each(filters[attribute], function( index, value ){
		filter = value.split(':');
		data += '<div class="col-sm-3 popup-box box" style="background-image: url(/img/filters/' + filter[1] + ');" onClick="selectFilter(\''+ attribute + '\',\'' + filter[0] + '\');" id="filter-' + filter[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() + '">' + filter[0] + '</div>';
	});
	
	var boxes = Object.keys(filters[attribute]).length + 1;
	var remainingBoxes = 0;
	if(boxes > 4){
		remainingBoxes = boxes % 4;
	}else{
		remainingBoxes = 4 - boxes;
	}
	
	for (i = 1; i <= remainingBoxes; i++) { 
		data += '<div class="col-sm-3 popup-box dummy-box"></div>';	
	}
	
	data += '</div>';
	openPopup(data);

	$('#popup .popup-box').each(function(i) {
		resizeBox($(this));
	});
}

function selectFilter(attribute,filter){
	$('#popup #filter-' + filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()).css('border-color','#8B2573');

	setTimeout(function(){
  		closePopup();
  	},500);

	if(filter == "Všetko"){
		$('.subpage.active .filter-' + attribute + ' small').text('');
	}else{
		$('.subpage.active .filter-' + attribute + ' small').text(filter);
	}

	$('.box').each(function(i) {
		if($(this).data(attribute) != undefined){
			$(this).fadeTo( Math.floor((Math.random() * 2000) + 200), 0);
		}
	});

	otherFilters = {};
	$('.subpage.active .filter').each(function(i) {
		if(!$(this).hasClass('filter-' + attribute)){
			otherValue = $(this).children().text();
			if(otherValue.length > 0){
				$.each($(this).attr("class").split(' '), function( index, value ){
					if(value.match("^filter-")){
						otherFilters[value.split('-')[1]] = otherValue;
					}
				});
			}
		}
	});

	setTimeout(function(){
    	$('.box').each(function(i) {
			if($(this).data(attribute) != undefined){
				element = $(this);
				element.hide();

				filterValues = element.data(attribute).split(';');
				
				if(filter == 'Všetko' || jQuery.inArray(filter, filterValues) >= 0){
					filterValid = 1;
					$.each(otherFilters, function( attr, value ){
						filterOtherValues = element.data(attr).split(';');
						if(jQuery.inArray(value, filterOtherValues) < 0){
							filterValid = 0;
						}
					});
					
					if(filterValid){
						element.show();
						element.fadeTo( Math.floor((Math.random() * 2000) + 200), 1);
					}
				}
			}
		});
  	}, 2000);
}

function selectMaterial(id){
	var selected_material = productData['materials'][id];
	var material_price = calculatePrice(selected_material['prices']);
	$('#product-material-value').text(selected_material['name']);
	$('#selected-material').css('background-image', 'url(/img/' + selected_material['img'] + ')');
	$('#product-material-group label small').text('(+' + material_price + '€/m2)');
	$('#material-price').val(material_price);
	updatePriceCalculation();
	productData['selected-material'] = id;
	closePopup();
}

function selectShipping(index){
	shipping = productData['shippings'][index];
	shippingLabel = shipping['name'];
	if(shipping['price'] > 0){
		shippingLabel += ' (+' + shipping['price'] + '€)'
	}
	$('#product-shipping-group label small').text(shippingLabel);
	$('#product-shipping').text(shipping['price']);

	if(shipping['price'] == 0){
		$('#product-shipping').parent().hide();
	}else{
		$('#product-shipping').parent().show();
	}

	updatePriceCalculation();
	productData['selected-shipping'] = shipping['id'];
	closePopup();
}

function selectInstallation(requested){
	prices = productData['installation_prices'];

	if(requested){
		price = calculatePrice(productData['installation_prices'])
		$('#product-installation-group label small').text('Áno (+' + price + '€/m2)');
		$('#product-installation').text(price);
		$('#product-installation').parent().show();
	}else{
		$('#product-installation-group label small').text('Nie');
		$('#product-installation').text(0);
		$('#product-installation').parent().hide();
	}

	updatePriceCalculation();
	closePopup();
}

function selectFinalisation(){
	$('#product-finalisation-group label small').text('Bez finalizácie');
	$('#product-finalisation').parent().hide();
	$('#product-finalisation').text(0);

	updatePriceCalculation();
}

function openAdditionalInfo(){
	var data = '<div class="row"><div class="col-sm-12">' + productData['long_information'] + '</div></div><div class="row"><div class="col-sm-12 text-right"><button class="btn-close" onClick="closePopup();"><span class="icon-cross"></span>Zatvoriť</button></div></div>';
	openPopup(data);
}

function openInstallationSelection(){
	var data = '<div class="row"><div class="col-sm-3 popup-box box-content-center" style="background-color: #ccc;"><div class="dummy"></div>Inštalácia</div><div class="col-sm-9"> ipsum</div></div><div class="row">';
	data += '<div class="col-sm-3 popup-box" onClick="selectInstallation(0);">Nie</div>';
	data += '<div class="col-sm-3 popup-box" onClick="selectInstallation(1);">Áno</div>';
	data += '<div class="col-sm-3 popup-box dummy-box"></div>';
	data += '<div class="col-sm-3 popup-box dummy-box"></div>';
	data += '</div>';
	openPopup(data);
}

function openOrderForm(){
	var data = '<div class="row"><div class="col-sm-12"><h1>Nezáväzná objednávka</h1><form action="send_order.php" method="POST" id="order-form">';
	data += '<hr /><h2>Osobné údaje</h2>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">Meno:</label><div class="col-sm-8"><input type="text" class="form-control" name="name"></div></div>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">Priezvisko:</label><div class="col-sm-8"><input type="text" class="form-control" name="surname"></div></div>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">E-mail:</label><div class="col-sm-8"><input type="email" class="form-control" name="email"></div></div>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">Telefón:</label><div class="col-sm-8"><input type="telephone" class="form-control" name="telephone"></div></div>';
	data += '<hr /><h2>Fakturačná adresa</h2>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">Adresa:</label><div class="col-sm-8"><input type="text" class="form-control" name="address"></div></div>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">PSČ:</label><div class="col-sm-8"><input type="text" class="form-control" name="psc"></div></div>';
	data += '<div class="form-group row"><label class="col-sm-4 control-label">Mesto:</label><div class="col-sm-8"><input type="text" class="form-control" name="city"></div></div>';
	if(parseFloat($('#product-shipping').text()) > 0){
		data += '<hr /><h2>Adresa doručenia</h2>';
		data += '<div class="form-group row"><div class="col-sm-1"><input type="checkbox" checked="checked" class="form-control" id="same-address" /></div><label class="col-sm-11 control-label">Rovnaká ako fakturačná adresa</label></div>';
		data += '<div id="hideable-address" style="display: none;">';
		data += '<div class="form-group row"><label class="col-sm-4 control-label">Adresa:</label><div class="col-sm-8"><input type="text" class="form-control" name="delivery_address"></div></div>';
		data += '<div class="form-group row"><label class="col-sm-4 control-label">PSČ:</label><div class="col-sm-8"><input type="text" class="form-control" name="delivery_psc"></div></div>';
		data += '<div class="form-group row"><label class="col-sm-4 control-label">Mesto:</label><div class="col-sm-8"><input type="text" class="form-control" name="delivery_city"></div></div>';
		data += '</div>';
	}
	data += '<hr /><h2>Doplňujúce informácie</h2>';
	data += '<div class="form-group row"><div class="col-sm-12"><textarea name="additional-info" class="form-control" rows="3"></textarea></div></div>';
	data += '<hr />';
	data += '<div class="form-group row"><div class="col-sm-12 text-center"><input type="submit" class="btn-color btn-center" value="Odoslať" /><input type="button" class="btn-color btn-center" onClick="closePopup();" value="Zrušiť" /></div></div>';
	data += '</form></div></div>';
	openPopup(data);

	$("#same-address").change(function() {
	    if(this.checked) {
	        $('#hideable-address').hide();
	    }else{
	    	$('#hideable-address').show();
	    }
	});

	$("#order-form").submit(function(e) {
		e.preventDefault();

	    if(validateOrderForm()){
	    	
	    	var orderdata = {};
	    	$.each($('#order-form').serializeArray(), function(_, kv) {
			  orderdata[kv.name] = kv.value;
			});
	    	
	    	orderdata['product'] = productData['name'];
	    	orderdata['width'] = $('#input-width').val();
	    	orderdata['height'] = $('#input-height').val();
	    	orderdata['quantity'] = $('#input-quantity').val();
	    	orderdata['finalisation_id'] = '0';
	    	orderdata['material_id'] = productData['selected-material'];
	    	orderdata['shipping_id'] = productData['selected-shipping'];
	    	orderdata['total_price'] = $('#product-price-total').text();
	    	orderdata['attachment'] = $('#attached-file').val();
	    	
	    	if($('#product-installation').text() == 0){
	    		orderdata['installation'] = 0;
	    	}else{
	    		orderdata['installation'] = 1;
	    	}
	    	
		    $.ajax({
		        type: "POST",
		        url: "/inc/order.php",
		        data: orderdata,
		        success: function(data){
		            console.log(data);
		            $('#order-button span').removeClass("icon-cart");
					$('#order-button span').addClass("icon-checkmark");
		            closePopup();
		        }
		    });
		}
	});

}

function validateOrderForm(){
	var valid = 1

	$('#order-form input').each(function(i) {
		if($(this).val().length == 0){
			if($(this).parent().parent().parent().is("#hideable-address")){
				if($('#hideable-address').css('display') !== 'none'){
					valid = 0
					$(this).addClass('invalid');
				}else{
					$(this).removeClass('invalid');
				}
			}else{
				valid = 0
				$(this).addClass('invalid');
			}
		}else{
			$(this).removeClass('invalid');
		}

		if($(this).attr('type') == "email" && !isEmail($(this).val())){
			$(this).addClass('invalid');
			valid = 0;
		}

		if($(this).attr('type') == "telephone" && !isTelephone($(this).val())){
			$(this).addClass('invalid');
			valid = 0;
		}

		if(($(this).attr('name') == "psc" || $(this).attr('name') == "delivery_psc") && $(this).val().length > 0 && !isPsc($(this).val())){
			$(this).addClass('invalid');
			valid = 0;
		}
	});

	return valid;
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isTelephone(telephone) {
	var filter = /^[0-9+]+$/;
    return filter.test(telephone);
}

function isPsc(psc){
	return psc.length == 5 && Math.floor(psc) == psc && $.isNumeric(psc)
}

function openShippingSelection(){
	var data = '<div class="row"><div class="col-sm-3 popup-box box-content-center" style="background-color: #ccc;"><div class="dummy"></div>Doprava</div><div class="col-sm-9"> ipsum</div></div><div class="row">';
	$.each(productData['shippings'], function( index, value ){
	    data += '<div class="col-sm-3 popup-box" onClick="selectShipping(' + index + ');" style="background-image: url(/img/' + value['img'] + ');"></div>';
	});
	
	var boxes = Object.keys(productData['shippings']).length;
	var remainingBoxes = 0;
	if(boxes > 4){
		remainingBoxes = boxes % 4;
	}else{
		remainingBoxes = 4 - boxes;
	}
	
	for (i = 1; i <= remainingBoxes; i++) { 
		data += '<div class="col-sm-3 popup-box dummy-box"></div>';	
	}
	 
	data += '</div>';
	openPopup(data);
}

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function getFirstKey( data ) {
	for (elem in data )
		return elem;
}
$(".input-number").InputSpinner();

$(document).ready(function(){

			$(".homepage a").click(function(event){
			event.preventDefault();
			changePage('domov');
		});

	$('input[type=file]').change(function(){

		$(this).simpleUpload("/inc/upload.php", {

			success: function(data){
				//upload successful
				console.log("upload successful!");
				console.log(data);
				$('#import-button span').removeClass("icon-import");
				$('#import-button span').addClass("icon-checkmark");
			},

			error: function(error){
				//upload failed
				console.log("upload error: " + error.name + ": " + error.message);
			}

		});

	});


	$("input").change(function() {
	   updatePriceCalculation();
	});

	$('#domov .box:nth-child(5)').after('<div class="col-md-4 col-sm-4 col-xs-12 box box-logo" id="desktop-logo"><a href="" class="box-content box-content-logo text-center"></a></div>');
});

$( window ).resize(function() {
	adjustPageContainer();
	
	$('.subpage.active .box').each(function(i) {
		resizeBox($(this));
		});
	
	  $('#popup .popup-box').each(function(i) {
			resizeBox($(this));
		});
});

function openPopupMenu(){
	var data = '<div class="row"><div class="col-sm-12 text-center"><h1>Prajete si opustiť stránku?</h1></div></div>';
            data += '<div class="row">';
			data += '<div class="col-sm-3 popup-box box href-box" style="background-color: #C41C72;" onClick="history.pushState(null, null, null);closePopup();">Zostať</div>';
			data += '<div class="col-sm-3 popup-box box href-box" style="background-color: #8B2573;" onClick="changePage(\'domov\',\'\');closePopup();">Menu</div>';
			data += '<div class="col-sm-3 popup-box box href-box" style="background-color: #414042;" onClick="changePage(\'kontakt\',\'\');closePopup();">Kontakt</div>';
			data += '<div class="col-sm-3 popup-box box href-box" style="background-color: #006199;" onClick="history.back();">Ísť späť</div>';
			data += '</div>';
			openPopup(data);
}

if (window.history && history.pushState) {
    addEventListener('load', function() {
        history.pushState(null, null, null);
        addEventListener('popstate', function() {
            openPopupMenu();
        });    
    });
}