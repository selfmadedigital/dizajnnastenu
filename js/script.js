var path = $(location).attr('pathname');
var productData;
var filters = [];

filters['category'] = [];
filters['room'] = [];
filters['color'] = [];
filters['design'] = [];

$(document).ready(function () {
	if (path != "/") {
		var url = path.split('/');
		changePage(url[1], url[2]);
	} else {
		changePage("domov", "");
	}
	
	$("#domov a").on("click", function (event) {
		event.preventDefault();
		var elementPath = $(this).attr('href').split('/');
		changePage(elementPath[0], elementPath[1]);
	})
	
	$(".homepage").on("click", function (event) {
		event.preventDefault();
		changePage("domov", "");
	})
	
	$("form button").on("click", function (event) {
		event.preventDefault();
	})
	
	$("#popup-overlay").on("click", function (event) {
		closePopup(1000);
	})
	
	$('#inspiracia .box-custom-color').each(function (i) {
				if ($(this).hasClass('color-half')) {
					$(this).css('background', 'linear-gradient(to right, #884D87 50%, ' + colorLuminance('#884D87', -0.1) + ' 50%');
				} else if ($(this).hasClass('color-darker')) {
					$(this).css('background-color', colorLuminance('#884D87', -0.1));
				} else if ($(this).hasClass('color-dark')) {
					$(this).css('background-color', colorLuminance('#884D87', -0.2));
				} else {
					$(this).css('background-color', '#884D87');
				}
			});
			
			$('#kontakt .box-custom-color').each(function (i) {
				if ($(this).hasClass('color-half')) {
					$(this).css('background', 'linear-gradient(to right, #414042 50%, ' + colorLuminance('#414042', -0.1) + ' 50%');
				} else if ($(this).hasClass('color-darker')) {
					$(this).css('background-color', colorLuminance('#414042', -0.1));
				} else if ($(this).hasClass('color-dark')) {
					$(this).css('background-color', colorLuminance('#414042', -0.2));
				} else {
					$(this).css('background-color', '#414042');
				}
			});
	
			$('#blog .box-custom-color').each(function (i) {
					if ($(this).hasClass('color-half')) {
						$(this).css('background', 'linear-gradient(to right, #884D87 50%, ' + colorLuminance('#884D87', -0.1) + ' 50%');
					} else if ($(this).hasClass('color-darker')) {
						$(this).css('background-color', colorLuminance('#884D87', -0.1));
					} else if ($(this).hasClass('color-dark')) {
						$(this).css('background-color', colorLuminance('#884D87', -0.2));
					} else {
						$(this).css('background-color', '#884D87');
					}
				});
				
				$('#blog-clanok .box-custom-color').each(function (i) {
					if ($(this).hasClass('color-half')) {
						$(this).css('background', 'linear-gradient(to right, #884D87 50%, ' + colorLuminance('#884D87', -0.1) + ' 50%');
					} else if ($(this).hasClass('color-darker')) {
						$(this).css('background-color', colorLuminance('#884D87', -0.1));
					} else if ($(this).hasClass('color-dark')) {
						$(this).css('background-color', colorLuminance('#884D87', -0.2));
					} else {
						$(this).css('background-color', '#884D87');
					}
				});
				
				$(".homepage a").click(function (event) {
			event.preventDefault();
			changePage('domov');
		});
	
		$('input[type=file]').change(function () {
	
			$(this).simpleUpload("/inc/upload.php", {
	
				success: function (data) {
					//upload successful
					console.log("upload successful!");
					console.log(data);
					$('#import-button span').removeClass("icon-import");
					$('#import-button span').addClass("icon-checkmark");
				},
	
				error: function (error) {
					//upload failed
					console.log("upload error: " + error.name + ": " + error.message);
				}
	
			});
	
		});
	
	
		$("input").change(function () {
			updatePriceCalculation();
		});
	
		$('#domov .box:nth-child(5)').after('<div class="col-md-4 col-sm-4 col-xs-12 box box-logo" id="desktop-logo"><a href="" class="box-content box-content-logo text-center"></a></div>');
});

function changePage(page, nameid) {
	if (page == "produkt") {
		id = nameid.toLowerCase();

		var data = {};
		data['name'] = nameid;


		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/inc/product.php",
			data: data,
			async: false,
			success: function (data) {
				productData = data;
				productData['selected-material'] = 0;
				productData['selected-finalisation'] = 0;
				productData['selected-shipping'] = 0;

				$('#product-name h1').text(data['name']);
				$('#product-image').html('<img src="/img/' + data['img'] + '" alt="' + data['name'] + '" />');
				$('#product-description').html(data['description']);
				$('#product-short-information').html(data['short_information']);
				
				$('#product-size-group label small').html('(rozmer v ' + productData['size_unit'] + '&sup2;)');
				
				$('#input-width').attr('value',productData['default_width']);
				$('#input-width').attr('data-decimals',productData['size_decimal']);
				$('#input-width').attr('min',productData['min_size']);
				$('#input-width').attr('step',productData['step']);

				$('#input-height').attr('value',productData['default_height']);
				$('#input-height').attr('data-decimals',productData['size_decimal']);
				$('#input-height').attr('min',productData['min_size']);
				$('#input-height').attr('step',productData['step']);

				$('#product-size').text(getSquareSize());

				if (data['materials'] != null && Object.keys(data['materials']).length > 0) {
					selectMaterial(getFirstKey(data['materials']), null);
				}
				if(data['finalisations'] != null && Object.keys(data['finalisations']).length > 0){
					selectFinalisation(getFirstKey(data['finalisations']), null);
				}
				
				$('.input-group').remove();
				$(".input-number").InputSpinner();
				
				$('#input-width').next('.input-group').find('input').addClass('input-size-field');
				$('#input-height').next('.input-group').find('input').addClass('input-size-field');
				$('#input-width').next('.input-group').find('input').attr('id','input-width-field');
				$('#input-height').next('.input-group').find('input').attr('id','input-height-field');
				
				$('#input-width').val(parseFloat(productData['default_width']).toFixed(productData['size_decimal']));
				$('#input-height').val(parseFloat(productData['default_height']).toFixed(productData['size_decimal']));
				$('#input-width-field').val(parseFloat(productData['default_width']).toFixed(productData['size_decimal']));
				$('#input-height-field').val(parseFloat(productData['default_height']).toFixed(productData['size_decimal']));
				
				$('.input-size-field').keyup(_.debounce(function(){
					var modulo = parseFloat($(this).val() % parseFloat(productData['step']));
					if(modulo > 0){
						$(this).val(parseFloat($(this).val()) + parseFloat(productData['step']) - modulo);
					}	
				} , 1500));
				
				$('#input-width-field').val(parseFloat(productData['default_width']).toFixed(productData['size_decimal']));
				$('#input-height-field').val(parseFloat(productData['default_height']).toFixed(productData['size_decimal']));
				
				selectShipping(0, null);
				selectInstallation(0, null);
				updatePriceCalculation();


				$('#produkt .box-custom-color').each(function (i) {
					if ($(this).hasClass('color-half')) {
						$(this).css('background', 'linear-gradient(to right, #' + data['color'] + ' 50%, ' + colorLuminance('#' + data['color'], -0.1) + ' 50%');
					} else if ($(this).hasClass('color-darker')) {
						$(this).css('background-color', colorLuminance('#' + data['color'], -0.1));
					} else if ($(this).hasClass('color-dark')) {
						$(this).css('background-color', colorLuminance('#' + data['color'], -0.2));
					} else {
						$(this).css('background-color', '#' + data['color']);
					}
				});


				var data_labels = [];
				var data_values = [];

				$.each(data['prices'], function (key, value) {
					data_labels.push(key);
					data_values.push(value);
				});


				$('#produkt button').each(function (i) {
					if (!$(this).hasClass('btn-menu')) {
						$(this).css('background-color', '#' + data['color']);
					}
				});

				$('.btn-color').each(function (i) {
					$(this).css('background-color', '#' + data['color']);
				});

				$('#produkt button>span').each(function (i) {
					$(this).css('background-color', colorLuminance('#' + data['color'], -0.2));
				});

				$('.btn-color>span').each(function (i) {
					$(this).css('background-color', colorLuminance('#' + data['color'], -0.2));
				});

				$('#produkt .btn-menu').each(function (i) {
					$(this).css('color', colorLuminance('#' + data['color'], -0.4));
				});

				$('#produkt .btn-menu').hover(function (i) {
					$(this).css('color', colorLuminance('#' + data['color'], 0.4));
				}, function () {
					$(this).css('color', colorLuminance('#' + data['color'], -0.4));
				});


				$.ajax({
						type: "GET",
						dataType: "json",
						url: "/inc/inspiration.php?filter_product=" + productData['name'],
						success: function (data) {
							var inspiration = data[Math.floor(Math.random() * data.length)]
							$('#produkt-inspiration-image').html('<img src="/img/' + inspiration['img'] + '" alt="' + inspiration['name'] + '" onClick="changePage(\'inspiracia\',\'\');" />');
						}
					});
			}
		});
	} else if (page == "inspiracia") {
		$.ajax({
			type: "POST",
			dataType: "json",
			async: false,
			url: "/inc/inspiration.php",
			success: function (data) {
				$('#inspiration-container').html('');
				$.each(data, function (key, value) {
					if ((key + 1) % 4 === 0 || (key + 1) % 4 === 1) {
						color = 9;
					} else {
						if ((key + 1) % 4 === 2) {
							color = 10;
						} else {
							color = 11;
						}
					}

					$.each(value['attributes'], function (keyattr, valueattr) {
						if (jQuery.inArray(valueattr['name'] + ':' + valueattr['img'], filters[valueattr['attribute']]) < 0) {
							filters[valueattr['attribute']].push(valueattr['name'] + ':' + valueattr['img']);
						}

						if (value[valueattr['attribute']] === undefined) {
							value[valueattr['attribute']] = valueattr['name'];
						} else {
							value[valueattr['attribute']] = value[valueattr['attribute']] + ';' + valueattr['name'];
						}
					});

					if (value['category'] === undefined) {
						value['category'] = "";
					}

					if (value['room'] === undefined) {
						value['room'] = "";
					}

					if (value['color'] === undefined) {
						value['color'] = "";
					}

					$('#inspiration-container').append('<div data-category="' + value['category'] + '" data-room="' + value['room'] + '" data-color="' + value['color'] + '" class="col-md-6 col-sm-6 col-xs-12 box box-double href-box box-color-' + color + '" onClick="toggleInspirationId(' + value['id'] + ');"><div class="box-content box-image" id="inspiration-' + value['id'] + '"><img src="/img/' + value['img'] + '" alt="' + value['name'] + '" /><span class="box-meta">#' + pad(value['id'], 5) + '</span></div></div>');
				});
			}
		});
	} else if (page == "blog") {
		if (nameid === undefined || nameid == '') {
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "/inc/blog.php",
				async: false,
				success: function (data) {
					$('#blog-container').text('');
					$.each(data, function (key, value) {
						if ((key + 1) % 2 === 1) {
							color = "9-10";
						} else {
							color = "11-9";
						}


						$.each(value['attributes'], function (keyattr, valueattr) {
							if (jQuery.inArray(valueattr['name'] + ':' + valueattr['img'], filters[valueattr['attribute']]) < 0) {
								filters[valueattr['attribute']].push(valueattr['name'] + ':' + valueattr['img']);
							}

							if (value[valueattr['attribute']] === undefined) {
								value[valueattr['attribute']] = valueattr['name'];
							} else {
								value[valueattr['attribute']] = value[valueattr['attribute']] + ';' + valueattr['name'];
							}
						});

						if (value['category'] === undefined) {
							value['category'] = "";
						}

						if (value['room'] === undefined) {
							value['room'] = "";
						}

						if (value['color'] === undefined) {
							value['color'] = "";
						}

						$('#blog-container').append('<div data-category="' + value['category'] + '" data-room="' + value['room'] + '" data-color="' + value['color'] + '" class="col-md-12 col-sm-12 col-xs-12 box href-box box-color-half-' + color + ' double-column" onClick="changePage(\'blog\',\'' + value['name'] + '\');"><div class="row"><div class="col-sm-6 box-padding"><h1>' + value['name'] + '</h1><p>' + value['short_content'] + '</p></div><div class="col-sm-6 box-image box-padding"><img src="/img/' + value['img'] + '" alt="' + value['name'] + '" /></div></div></div>');
					});
				}
			});
			
		} else {
			id = nameid.toLowerCase();
			page = "blog-clanok";

			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "/inc/blog.php?name=" + nameid,
				success: function (data) {
					$('#blog-name').text(data['name']);
					$('#blog-long-content').html(data['long_content']);
					$('#blog-short-content').html(data['short_content']);
					$('#blog-image').html('<img src="/img/' + data['img'] + '" alt="' + data['name'] + '" />');

					var filter = '';
					$.each(data['filters'], function (key, value) {
						if (key > 0) {
							filter += '&';
						} else {
							filter += '?';
						}
						filter += 'filter[]=' + value['filter_id'];
					});

					$.ajax({
						type: "GET",
						dataType: "json",
						url: "/inc/inspiration.php" + filter,
						success: function (data) {
							var inspiration = data[Math.floor(Math.random() * data.length)]
							$('#blog-inspire-image').html('<img src="/img/' + inspiration['img'] + '" alt="' + inspiration['name'] + '" />');
						}
					});
				}
			});
			
		}
	}

	$('.subpage.active .box').each(function (i) {
		$(this).fadeTo(Math.floor((Math.random() * 1000) + 200), 0);
	});

	if ($('.subpage.active').length == 0) {
		$('.subpage#domov').addClass("active");
	}

	var finalOpacity = 1;

	$('.subpage.active').fadeOut(500, function () {
		$('#' + page + ' .box').each(function (i) {
			$(this).css('display', 'none');
		});
		$("#" + page).fadeIn(500, function () {
			$('.subpage.active').removeClass('active');
			$("#" + page).addClass('active');
			$('#' + page + ' .box').each(function (i) {
				if (page == 'domov' && !$(this).hasClass('box-logo')) {
					finalOpacity = 0.7;
				} else {
					finalOpacity = 1;
				}
				$(this).fadeTo(Math.floor((Math.random() * 1000) + 200), finalOpacity);
			});

			adjustResolution();
		});
	});
}

function resizeBox(element) {
	if (element.hasClass('col-sm-8') || element.hasClass('box-menu') || element.hasClass('double-column')) {
		height = element.outerWidth() / 2;
	} else if (element.hasClass('triple-column')) {
		height = element.outerWidth() / 3;
	} else {
		height = element.outerWidth();
	}

	fontSize = height / 8;

	element.css('height', height + 'px');
	if (element.hasClass('box-menu')) {
		element.find('h1').css('font-size', fontSize * 1.5 + 'px');
	} else {
		element.find('h1').css('font-size', fontSize + 'px');
	}


	element.find('button').css('font-size', fontSize / 2.5 + 'px');
	element.find('label').css('font-size', fontSize / 2.5 + 'px');
	element.find('#product-material-group').css('font-size', fontSize / 2.5 + 'px');
	element.find('#product-price-detail').css('font-size', fontSize / 2.5 + 'px');
	element.find('.btn-menu').css('font-size', fontSize * 2 + 'px');
	element.find('.btn-menu').css('top', 'calc(50% - ' + fontSize + 'px)');
	element.find('.input-group').css('font-size', fontSize / 3 + 'px');
	element.find('.filter-change .filter').css('font-size', fontSize / 2.5 + 'px');
	element.find('p').css('font-size', fontSize / 2.5 + 'px');
	element.find('.quotes div').css('font-size', fontSize / 2 + 'px');

	if (element.hasClass('popup-box')) {
		if (element.hasClass('triple-column')) {
			element.css('font-size', fontSize + 'px');
		} else {
			element.css('font-size', fontSize / 1.5 + 'px');
		}
	}
}

function adjustResolution() {
	$('.subpage.active .box').each(function (i) {
		resizeBox($(this));
	});

	var container = $('#main-container');
	container.css('max-width', window.innerHeight - 50 + 'px');
	
	if (!$('#popup-container').hasClass('fullscreen')) {
		$('#popup-container').css('width', $('#main-container').outerWidth() * 1.2);
		if ($('#popup-container').outerHeight() < window.innerHeight) {
			$('#popup-container').css('top', 'calc(50% - ' + $('#popup-container').outerHeight() / 2 + 'px)');
		} else {
			$('#popup-container').css('top', '0');
		}
		$('#popup-container').css('left', 'calc(50% - ' + $('#popup-container').outerWidth() / 2 + 'px)');

		$('#popup-close').css('left', $('#popup-container').position().left + $('#popup-container').outerWidth() - 28 + 'px');
		$('#popup-close').css('top', $('#popup-container').position().top + 10 + 'px');
	} else {
		$('#popup-container').css('top', '');
		$('#popup-container').css('left', '');
		$('#popup-container').css('width', '');
		$('#popup-close').css('top', '');
		$('#popup-close').css('left', '');
	}

	$('.subpage.active .box').each(function (i) {
		resizeBox($(this));
	});

	$('#popup .popup-box').each(function (i) {
		resizeBox($(this));
	});

	$("#inspiration-container").css('max-height', $("#inspiration-controls").height() + 'px');
	$("#blog-container").css('max-height', $("#blog-controls").height() + 'px');

	$('.scroll-arrow').each(function () {
		$(this).css('font-size', $(this).parent().width() / 15 + 'px');
		$(this).css('left', 'calc(50% - ' + ($(this).parent().width() / 30 + 3) + 'px)');
	});

	$('.fullscreen-arrows').css('font-size', $('.fullscreen-arrows').parent().width() / 20 + 'px');

	$('#popup h1').css('font-size', $('#popup h1').parent().width() / 20 + 'px');

	if ($('#popup-container').hasClass('menu')) {
		$('#popup-close').css('visibility', 'hidden');
	} else {
		$('#popup-close').css('visibility', 'visible');
	}
}

function calculatePrice(price_table) {
	if (price_table.length == 0) {
		return 0;
	}
	squaresize = getSquareSize();
	if (price_table[squaresize] !== undefined) {
		return price_table[squaresize];
	} else {
		var max = 0;
		var min = Infinity;
		$.each(price_table, function (key, value) {
			key = parseFloat(key);
			if (key > max) {
				max = key;
			}

			if (key < min) {
				min = key;
			}
		});
		if (squaresize > max) {
			return price_table[parseFloat(max).toFixed(2)];
		} else if (squaresize < min) {
			return price_table[parseFloat(min).toFixed(2)];
		} else {
			var lower = 0;
			var greater = Infinity;
			$.each(price_table, function (key, value) {
				key = parseFloat(key);
				if (key > squaresize) {
					if (key < greater) {
						greater = key;
					}
				}

				if (key < squaresize) {
					if (key > lower) {
						lower = key;
					}
				}
			});

			diff = price_table[lower.toFixed(2)] - price_table[greater.toFixed(2)];
			div = diff / (greater - lower);
			return price_table[lower.toFixed(2)] - div * (squaresize - lower);
		}
	}
}

function getSquareSize() {
	var squareSize = ($('#input-width').val() * $('#input-height').val()).toFixed(2);
	if(productData['size_unit'] == 'cm'){
		squareSize = squareSize / 10000;
	}
	return squareSize;
}

function updatePriceCalculation() {
	var squareSize = getSquareSize();
	$('#product-size').text(squareSize);
	refreshInstallation();
	
	if(squareSize > parseFloat(productData['max_size'])){
		$('#product-price-total').text("Cena na vyžiadanie");
		$('#product-price-total').addClass("request");
		$('#product-price').parent().css('visibility', 'hidden');
		$('#product-finalisation').parent().hide();
		$('#product-installation').parent().hide();
		$('#product-price-piece').parent().css('visibility', 'hidden');
		$('#product-shipping').parent().css('visibility', 'hidden');
		$('#product-price-total-tax-free').hide();
	}else{
		$('#product-price-total').removeClass("request");
		$('#product-price').parent().css('visibility', 'visible');
		$('#product-price-piece').parent().css('visibility', 'visible');
		$('#product-shipping').parent().css('visibility', 'visible');
		$('#product-price-total-tax-free').show();
		var pricePerSquare = parseFloat(calculatePrice(productData['prices'])).toFixed(2);
		if ($('#material-price').val().length > 0) {
			pricePerSquare = (parseFloat(pricePerSquare) + parseFloat($('#material-price').val())).toFixed(2);
		}
		var priceInstallation = squareSize * parseFloat($('#product-installation').text());
	
		var priceFinalisation = 0;
		if(parseFloat($('#product-finalisation span').text()) > 0){
			if(productData['finalisation_tableprice'] == '1'){
				priceFinalisation = squaresize*parseFloat($('#product-finalisation span').text()).toFixed(2);
			}else{
				priceFinalisation = squareSize*pricePerSquare/100*parseFloat($('#product-finalisation span').text()).toFixed();
			}
		}
		
		if (priceFinalisation == 0) {
			$('#product-finalisation').parent().hide();
		} else {
			$('#product-finalisation').parent().show();
		}
		
		var priceShipping = 0;
		if($.isNumeric($('#product-shipping').text())){
			priceShipping = parseFloat($('#product-shipping').text()).toFixed(2);
		}
	
		var totalPrice = (squareSize * pricePerSquare + priceInstallation + priceFinalisation).toFixed(2);
		$('#product-price-piece').text(totalPrice);
	
		var quantity = parseInt($('#input-quantity').val());
		var discount = 0;
	
		$.each(productData['quantity_discount'], function (key, value) {
			key = parseInt(key);
			value = parseFloat(value);
			if (quantity >= key && discount < value) {
				discount = value;
			}
		});
	
		totalPrice = (totalPrice * quantity).toFixed(2);
		if (discount > 0) {
			totalPrice = (totalPrice * (100 - discount) / 100).toFixed(2);
			$('#product-discount').text(discount);
			$('#product-discount').parent().show();
		} else {
			$('#product-discount').text(0);
			$('#product-discount').parent().hide();
		}
	
		totalPrice = (parseFloat(totalPrice) + parseFloat(priceShipping)).toFixed(2);
	
		$('#product-price').text(pricePerSquare);
		$('#product-price-total').text(totalPrice);
		$('#product-price-total-tax-free').text((totalPrice / 1.2).toFixed(2));
	}
}

function openPopup(data, fullscreen, menu) {
	var scrollPosition = [
		self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	];
	
	if (fullscreen) {
		$('#popup-container').addClass('fullscreen');
	} else {
		$('#popup-container').removeClass('fullscreen');
	}

	if (menu) {
		$('#popup-container').addClass('menu');
	} else {
		$('#popup-container').removeClass('menu');
	}

	$('#popup-container').html('<div id="popup-data" class="container">' + data + '</div>');

	$('#popup').css('left', scrollPosition[0]);
	$('#popup').css('top', scrollPosition[1] - 3);
	$('#popup').fadeIn(500);
	$('body').css('overflow', 'hidden');

	$('#popup-container button').each(function (i) {
		if ($(this).attr('id') == 'popup-close') {
			$(this).css('color', '#' + productData['color']);
		} else {
			$(this).css('background-color', '#' + productData['color']);
		}
	});

	$('#popup-container .btn-color').each(function (i) {
		$(this).css('background-color', '#' + productData['color']);
	});

	$('#popup .popup-box').each(function (i) {
		resizeBox($(this));
	});

	adjustResolution();
	$('body').addClass('popup');
}

function closePopup(delay) {
	$('#popup').delay(delay).fadeOut(500);
	$('body').css('overflow', 'scroll');
}

function openMaterialSelection() {
	var data = '<div class="row"><div class="col-sm-3 popup-box"><div class="box-content box-content-center" style="color: #fff; background-color: #' + productData['color'] + ';">Druh Materiálu</div></div><div class="col-sm-9 popup-box triple-column"><div class="box-content">ipsum</div></div></div><div class="row">';
	$.each(productData['materials'], function (index, value) {
		data += '<div class="col-sm-3 popup-box href-box" onClick="selectMaterial(' + value['id'] + ', this);"><div class="box-content" style="background-image: url(/img/' + value['img'] + ');"></div></div>';
	});

	data += '</div>';
	openPopup(data, 0, 0);
}

function openAttachFile() {
	var data = '<div class="row"><div class="col-sm-3 popup-box"><div class="box-content box-content-center" style="color: #fff; background-color: #' + productData['color'] + ';">Prílohy objednávky</div></div><div class="col-sm-9 popup-box triple-column"><div class="box-content">ipsum</div></div></div><div class="row">';

	data += '</div>';
	openPopup(data, 0, 0);
}

function openInspirationsPopup() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/inc/inspiration.php",
		success: function (data) {
			var popupData = '<div class="row">';
			$.each(data, function (key, value) {
				popupData += '<div class="popup-box href-box col-sm-3" onClick="toggleInspirationId(' + value['id'] + ');" id="inspiration-' + value['id'] + '"><div class="box-content box-content-center" style="background-image: url(/img/' + value['img'] + ');"><span class="box-meta">#' + pad(value['id'], 5) + '</span></div></div>';
			});

			popupData += '</div>';

			openPopup(popupData, 1, 0);
			
			$('#main-container #inspiration-container .box-image span').each(function(i) {
			    if (!$(this).is(':hidden')) {
					$('#popup-container #' + $(this).parent().attr('id') + ' span').fadeIn(500);
				}
			});
		}
	});
}

function toggleInspirationId(id) {
	$('#inspiration-' + id + ' span').each(function(i) {
	    if ($(this).is(':hidden')) {
			$(this).fadeIn(500);
		} else {
			$(this).fadeOut(500);
		}
	});
}

function openFinalisationSelection() {
	var data = '<div class="row"><div class="col-sm-3 popup-box"><div class="box-content box-content-center" style="color: #fff; background-color: #' + productData['color'] + ';">Finalizácia</div></div><div class="col-sm-9 popup-box triple-column"><div class="box-content">ipsum</div></div></div><div class="row">';
	$.each(productData['finalisations'], function (index, value) {
		data += '<div class="col-sm-3 popup-box href-box" onClick="selectFinalisation(' + value['id'] + ', this);"><div class="box-content box-content-center" style="background-image: url(/img/' + value['img'] + ');"></div></div>';
	});

	data += '</div>';
	openPopup(data, 0, 0);
}

function openFilterSelection(attribute) {
	var data = '<div class="row">';
	data += '<div class="col-sm-3 popup-box box" onClick="selectFilter(\'' + attribute + '\',\'Všetko\', this);" id="filter-vsetko"><div class="box-content box-content-center" style="background-image: url(/img/filters/all.png);">Všetko</div></div>';
	$.each(filters[attribute], function (index, value) {
		filter = value.split(':');
		data += '<div class="col-sm-3 popup-box box" onClick="selectFilter(\'' + attribute + '\',\'' + filter[0] + '\', this);" id="filter-' + filter[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() + '"><div class="box-content box-content-center" style="background-image: url(/img/filters/' + filter[1] + ');">' + filter[0] + '</div></div>';
	});

	data += '</div>';
	openPopup(data, 0, 0);
}

function selectFilter(attribute, filter, element) {
	$(element).find('.box-content').css('box-shadow', 'inset 0 0 0 2px #884D87');
	$('#popup #filter-' + filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()).css('border-color', '#8B2573');

	setTimeout(function () {
		closePopup(1000);
	}, 500);

	if (filter == "Všetko") {
		$('.subpage.active .filter-' + attribute + ' small').text('');
	} else {
		$('.subpage.active .filter-' + attribute + ' small').text(filter);
	}

	$('.box').each(function (i) {
		if ($(this).data(attribute) != undefined) {
			$(this).fadeTo(Math.floor((Math.random() * 1000) + 200), 0);
		}
	});

	otherFilters = {};
	$('.subpage.active .filter').each(function (i) {
		if (!$(this).hasClass('filter-' + attribute)) {
			otherValue = $(this).children().text();
			if (otherValue.length > 0) {
				$.each($(this).attr("class").split(' '), function (index, value) {
					if (value.match("^filter-")) {
						otherFilters[value.split('-')[1]] = otherValue;
					}
				});
			}
		}
	});

	setTimeout(function () {
		$('.box').each(function (i) {
			if ($(this).data(attribute) != undefined) {
				element = $(this);
				element.hide();

				filterValues = element.data(attribute).split(';');

				if (filter == 'Všetko' || jQuery.inArray(filter, filterValues) >= 0) {
					filterValid = 1;
					$.each(otherFilters, function (attr, value) {
						filterOtherValues = element.data(attr).split(';');
						if (jQuery.inArray(value, filterOtherValues) < 0) {
							filterValid = 0;
						}
					});

					if (filterValid) {
						element.show();
						element.fadeTo(Math.floor((Math.random() * 1000) + 200), 1);
					}
				}
			}
		});
	}, 2000);
}

function resetFilterSelection() {
	$.each(Object.keys(filters), function (key, value) {
		selectFilter(value, "Všetko", null);
	});
}

function selectMaterial(id, element) {
	$(element).find('.box-content').css('box-shadow', 'inset 0 0 0 2px #' + productData['color']);
	
	var selected_material = productData['materials'][id];
	var material_price = calculatePrice(selected_material['prices']);
	$('#product-material-value').text(selected_material['name']);
	$('#selected-material').css('background-image', 'url(/img/' + selected_material['img'] + ')');
	$('#product-material-group label small').text('(+' + material_price + '€/m2)');
	$('#material-price').val(material_price);
	updatePriceCalculation();
	productData['selected-material'] = id;
	closePopup(1000);
}

function selectFinalisation(id, element) {
	$(element).find('.box-content').css('box-shadow', 'inset 0 0 0 2px #' + productData['color']);
	var selected_finalisation = productData['finalisations'][id];

	var finalisation_price = 0;
	var finalisation_type = '';
	if (productData['finalisation_tableprice'] == '1') {
		finalisation_price = calculatePrice(selected_finalisation['prices']);
		finalisation_type = '€/m2';
	} else {
		finalisation_price = selected_finalisation['percentage'];
		finalisation_type = '%';
	}

	finalisation_label = selected_finalisation['name'];
	finalisation_label += ' (+' + finalisation_price + finalisation_type + ')';
	
	$('#product-finalisation-group label small').text(finalisation_label);
	$('#product-finalisation').html('<span>' + parseInt($('#product-price').text())/100*parseFloat(selected_finalisation['percentage']) + '</span> €');

	productData['selected-finalisation'] = id;
	updatePriceCalculation();
	closePopup(1000);
}

function selectShipping(index, element) {
	$(element).find('.box-content').css('box-shadow', 'inset 0 0 0 2px #' + productData['color']);
	shipping = productData['shippings'][index];
	shippingLabel = shipping['name'];
	if (shipping['price'] > 0) {
		shippingLabel += ' (+' + shipping['price'] + '€)'
	}
	$('#product-shipping-group label small').text(shippingLabel);
	if(shipping['price'] == null){
		$('#product-shipping').text('Podľa dohody');
		$('#product-shipping').removeClass('numeric');
	}else{
		$('#product-shipping').text(shipping['price']);
		$('#product-shipping').addClass('numeric');
	}

	if (shipping['price'] == 0) {
		$('#product-shipping').parent().hide();
	} else {
		$('#product-shipping').parent().show();
	}

	updatePriceCalculation();
	productData['selected-shipping'] = shipping['id'];
	closePopup(1000);
}

function selectInstallation(requested, element) {
	$(element).find('.box-content').css('box-shadow', 'inset 0 0 0 2px #' + productData['color']);
	productData['installation'] = requested;
	updatePriceCalculation();
	closePopup(1000);
}

function refreshInstallation(){
	if (productData['installation']) {
		price = calculatePrice(productData['installation_prices']).toFixed(2);
		$('#product-installation-group label small').text('Áno (+' + price + '€/m2)');
		$('#product-installation').text(price);
		$('#product-installation').parent().show();
	} else {
		$('#product-installation-group label small').text('Nie');
		$('#product-installation').text(0);
		$('#product-installation').parent().hide();
	}
}

function openAdditionalInfo() {
	var data = '<div class="row"><div class="col-sm-12">' + productData['long_information'] + '</div></div><div class="row"><div class="col-sm-12 text-right"></div></div>';
	openPopup(data, 0, 0);
}

function openInstallationSelection() {
	var data = '<div class="row"><div class="col-sm-3 popup-box"><div class="box-content box-content-center" style="color: #fff; background-color: #' + productData['color'] + ';">Inštalácia</div></div><div class="col-sm-9 popup-box triple-column"><div class="box-content">ipsum</div></div></div><div class="row">';
	data += '<div class="col-sm-3 popup-box" onClick="selectInstallation(0, this);"><div class="box-content box-content-center" style="background-image: url(/img/installation-no.png);"></div></div>';
	data += '<div class="col-sm-3 popup-box" onClick="selectInstallation(1, this);"><div class="box-content box-content-center" style="background-image: url(/img/installation-yes.png);"></div></div>';
	data += '</div>';
	openPopup(data, 0, 0);
}

function openOrderForm() {
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
	if (parseFloat($('#product-shipping').text()) > 0) {
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
	data += '<div class="form-group row"><div class="col-sm-12 text-center"><input type="submit" class="btn-color btn-center" value="Odoslať" /><input type="button" class="btn-color btn-center" onClick="closePopup(1000);" value="Zrušiť" /></div></div>';
	data += '</form></div></div>';
	openPopup(data, 0, 0);

	$("#same-address").change(function () {
		if (this.checked) {
			$('#hideable-address').hide();
		} else {
			$('#hideable-address').show();
		}
	});

	$("#order-form").submit(function (e) {
		e.preventDefault();

		if (validateOrderForm()) {

			var orderdata = {};
			$.each($('#order-form').serializeArray(), function (_, kv) {
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

			if ($('#product-installation').text() == 0) {
				orderdata['installation'] = 0;
			} else {
				orderdata['installation'] = 1;
			}

			$.ajax({
				type: "POST",
				url: "/inc/order.php",
				data: orderdata,
				success: function (data) {
					console.log(data);
					$('#order-button span').removeClass("icon-cart");
					$('#order-button span').addClass("icon-checkmark");
					closePopup(1000);
				}
			});
		}
	});

}

function validateOrderForm() {
	var valid = 1

	$('#order-form input').each(function (i) {
		if ($(this).val().length == 0) {
			if ($(this).parent().parent().parent().is("#hideable-address")) {
				if ($('#hideable-address').css('display') !== 'none') {
					valid = 0
					$(this).addClass('invalid');
				} else {
					$(this).removeClass('invalid');
				}
			} else {
				valid = 0
				$(this).addClass('invalid');
			}
		} else {
			$(this).removeClass('invalid');
		}

		if ($(this).attr('type') == "email" && !isEmail($(this).val())) {
			$(this).addClass('invalid');
			valid = 0;
		}

		if ($(this).attr('type') == "telephone" && !isTelephone($(this).val())) {
			$(this).addClass('invalid');
			valid = 0;
		}

		if (($(this).attr('name') == "psc" || $(this).attr('name') == "delivery_psc") && $(this).val().length > 0 && !isPsc($(this).val())) {
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

function isPsc(psc) {
	return psc.length == 5 && Math.floor(psc) == psc && $.isNumeric(psc)
}

function openShippingSelection() {
	var data = '<div class="row"><div class="col-sm-3 popup-box"><div class="box-content box-content-center" style="color: #fff; background-color: #' + productData['color'] + ';">Doprava</div></div><div class="col-sm-9 popup-box triple-column"><div class="box-content">ipsum</div></div></div><div class="row">';
	$.each(productData['shippings'], function (index, value) {
		data += '<div class="col-sm-3 popup-box" onClick="selectShipping(' + index + ', this);"><div class="box-content box-content-center" style="background-image: url(/img/' + value['img'] + ');"></div></div>';
	});

	data += '</div>';
	openPopup(data, 0, 0);
}

function colorLuminance(hex, lum) {

	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum = lum || 0;

	var rgb = "#",
		c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}

	return rgb;
}

function getFirstKey(data) {
	for (elem in data)
		return elem;
}

$(window).resize(function () {
	adjustResolution();
});

function openPopupMenu() {
	var data = '<div class="row"><div class="col-sm-12 text-center"><h1>Prajete si opustiť stránku?</h1></div></div>';
	data += '<div class="row">';
	data += '<div class="col-sm-3 popup-box box href-box" onClick="history.pushState(null, null, null);closePopup(1000);"><div class="box-content box-content-center" style="background-color: #C41C72; color: #fff;">Zostať</div></div>';
	data += '<div class="col-sm-3 popup-box box href-box" onClick="changePage(\'domov\',\'\');closePopup(1000);"><div class="box-content box-content-center" style="background-color: #8B2573; color: #fff;">Domov</div></div>';
	data += '<div class="col-sm-3 popup-box box href-box" onClick="changePage(\'kontakt\',\'\');closePopup(1000);"><div class="box-content box-content-center" style="background-color: #414042; color: #fff;">Kontakt</div></div>';
	data += '<div class="col-sm-3 popup-box box href-box" onClick="history.back();"><div class="box-content box-content-center" style="background-color: #006199; color: #fff;">Opustiť</div></div>';
	data += '</div>';
	openPopup(data, 0, 1);
}

function scrollContainer(target) {
	var container = $('#' + target + '-container');
	var maxPosition = container.children().length / 3 * container.outerHeight() - container.outerHeight();
	if (target == 'inspiration') {
		maxPosition /= 2;
	}
	var newPosition = container.scrollTop() + container.outerHeight();
	if (newPosition > maxPosition) {
		newPosition = container.scrollTop() + container.outerHeight() / 3 * 2;
		if (newPosition > maxPosition) {
			newPosition = container.scrollTop() + container.outerHeight() / 3;
			if (newPosition > maxPosition) {
				newPosition = 0;
			}
		}
	}
	container.animate({
		scrollTop: newPosition
	}, 1500);
}

if (window.history && history.pushState) {
	addEventListener('load', function () {
		history.pushState(null, null, null);
		addEventListener('popstate', function () {
			openPopupMenu();
		});
	});
}

window.setInterval(function () {
	var quotes = $('.subpage.active .quotes div');
	quotes.fadeOut(300);
	$(quotes[Math.floor(Math.random() * quotes.length)]).delay(400).fadeIn(300);
}, 10000);

function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

$('body.popup').bind('touchmove', function (e) {
	e.preventDefault();
});