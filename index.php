<?php require_once("inc/db.php");?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="/icomoon/style.css">
    <link rel="stylesheet" href="/css/style.css?v=<?=time();?>">

    <title>Dizajnnastenu.sk</title>
    
  </head>
  <body>
  	<div id="popup" style="display: none;">
  		<div id="popup-overlay"></div>
  		<div id="popup-container"></div>
  	</div>

    <div class="vertical-center">
    	<div class="container">
		    <div class="row subpage" style="display:none;" id="domov">
		    	<div class="col-md-4 col-sm-4 col-xs-12 box" id="mobile-logo">
		        <a href="" class="box-content box-content-logo text-center"><img src="img/logo.png" alt="" /></a>
		      </div>
		      <?php
		      		$sql = "SELECT name, color FROM product ORDER BY order_index";
					$result = $db->query($sql);

					if ($result->num_rows > 0) {
	    				while($row = $result->fetch_assoc()) {
	    					echo '<div class="col-md-4 col-sm-4 col-xs-12 box" style="background-color: #'.$row['color'].';">';
						    	echo '<a href="produkt/'.strtolower($row['name']).'" class="box-content box-content-center text-center" style="text-transform: capitalize;"><h1>'.$row['name'].'</h1></a>';
						    echo '</div>';
	    				}
	    			}
		      ?>
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-6">
		        
		        <a href="inspiracia" class="box-content box-content-center text-center"><h1>Inšpirácia</h1></a>
		       </div>
		       <div class="col-md-4 col-sm-4 col-xs-12 box box-color-7">
		        
		        <a href="blog" class="box-content box-content-center text-center"><h1>Blog</h1></a>
		       </div>
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-8">
		        
		        <a href="kontakt" class="box-content box-content-center text-center"><h1>Kontakt</h1></a>
		       </div>
		    </div>

		    <div class="row subpage" style="display:none;" id="produkt">
		      
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-custom-color">
		        
		        <a href="" class="box-content box-content-center text-center homepage" id="product-name"><h1></h1></a>
		      </div>
		      <div class="col-md-8 col-sm-8 col-xs-12 box box-color-half-9-10">
		        <div class="box-content text-center box-image" id="product-image">
		        </div>
		      </div>
		      <div class="col-md-4 col-sm-4 col-xs-12 box-container">
		      	<div class="col-md-12 col-sm-12 col-xs-12 box box-color-10">
			       	<div class="box-content">
			       		<div id="product-description"></div>
			       	</div>
		       	</div>
		       	<div class="col-md-12 col-sm-12 col-xs-12 box box-color-9">
			      	<div class="box-content">
			      		<span id="product-short-information"></span>
			      		<button class="btn-info btn-bottom" onClick="openAdditionalInfo();"><span class="icon-info"></span>Dozvedieť sa viac</button>
			      	</div>
			      </div>
		      </div>

		      <div class="col-md-4 col-sm-4 col-xs-12 box-container">
		      		<div class="col-md-12 col-sm-12 col-xs-12 box box-color-11">
			        	<div class="box-content" id="product-operands">
			        		<form>
						    <div class="form-group row">
						      	<label class="col-sm-6 control-label">ROZMER:</label>
						      	<div class="col-sm-6">
	                    			<input type="text" class="form-control input-number" value="1" min="1" step="1" id="input-width">
	                    			<input type="text" class="form-control input-number" value="1" min="1" step="1" id="input-height">
	                  			</div>
						    </div>
						    <div class="form-group row">
						      <label class="col-sm-6 control-label">POČET:</label>
						      <div class="col-sm-6">
						      	<input type="number" class="input-number" value="1" min="1" max="10" step="1" id="input-quantity"/>
						      </div>
						    </div>
						    <div class="form-group row" id="product-finalisation-group">
						      <label class="col-sm-6 control-label">FINALIZÁCIA:<small></small></label>
						      <div class="col-sm-6 text-right">
			        				<button class="btn-change" onClick="openMaterialSelection();"><span class="icon-refresh"></span>Zmeniť</button>
			        			</div>
						    </div>
						    <div class="form-group row" id="product-installation-group">
						      <label class="col-sm-6 control-label">INŠTALÁCIA:<small></small></label>
						      <div class="col-sm-6 text-right">
			        				<button class="btn-change" onClick="openInstallationSelection();"><span class="icon-refresh"></span>Zmeniť</button>
			        			</div>
						    </div>
						    <div class="form-group row" id="product-shipping-group">
						      <label class="col-sm-6 control-label">DOPRAVA:<small></small></label>
						      <div class="col-sm-6 text-right">
			        				<button class="btn-change" onClick="openShippingSelection();"><span class="icon-refresh"></span>Zmeniť</button>
			        			</div>
						    </div>
						  </form>
						</div>
			      </div>

			      <div class="col-md-12 col-sm-12 col-xs-12 box box-color-10" id="material-selection">
			      		<div class="box-content">
				      		<div class="row">
				      			<div class="col-sm-5" id="product-material-group">
				      				<span>MATERIÁL:</span>
				      				<span id="product-material-value"></span><input type="hidden" id="material-price" />
				      				<button class="btn-change" onClick="openMaterialSelection();"><span class="icon-refresh"></span>Zmeniť</button>
				      			</div>
				      			<div class="col-sm-7">
				      				<div class="material-preview" id="selected-material"></div>
				      			</div>
				      		</div>
				      		<label class="btn-color btn-file btn-bottom text-center" id="import-button">
				      			<input type="hidden" id="attached-file" />
							    <input type="file" name="file"/>
							    <span class="icon-import"></span>Priložiť súbor
							</label>
				      	</div>
			      </div>
		      </div>

		      <div class="col-md-4 col-sm-4 col-xs-12 box-container">
		      		<div class="col-md-12 col-sm-12 col-xs-12 box box-color-9">
			      		<div class="box-content">
			        		<canvas id="product-chart" width="300" height="300"></canvas>
			        	</div>
			      </div>

			      
			      
			      <div class="col-md-12 col-sm-12 col-xs-12 box box-color-11">
			      		<div class="box-content" id="product-price-detail">
				      		<div class="row">
				      			<div class="col-sm-6">
				      				VÝMERA:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-size"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				CENA / m<span class="super">2</span>:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-price"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				CENA / KS:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-price-piece"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				FINALIZÁCIA:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-finalisation"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				INŠTALÁCIA:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-installation"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				DOPRAVA:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-shipping"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-6">
				      				ZĽAVA:
				      			</div>
				      			<div class="col-sm-6 text-right" id="product-discount"></div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-12 text-right" id="product-price-total">
				      			</div>
				      		</div>
				      		<div class="row">
				      			<div class="col-sm-12 text-right" id="product-price-total-tax-free"></div>
				      		</div>
				        	<button class="btn-order btn-bottom" id="order-button" onClick="openOrderForm();"><span class="icon-cart"></span>Predbežná objednávka</button>
				        </div>
			       </div>
		      </div>
		    </div>

		    <div class="row subpage" style="display:none;" id="inspiracia">
		    	<div class="col-md-4 col-sm-4 col-xs-12">
		    		<div class="row">
			    		<div class="col-sm-12 box box-color-6">
					        <a href="" class="box-content box-content-center text-center homepage"><h1>Inšpirácia</h1></a>
					      </div>
					 </div>
					 <div class="row">
						 <div class="col-sm-12 box box-color-10">
					        <div class="box-content filter-container">
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter filter-category">
					        			PRODUKT<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('category');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter filter-room">
					        			MIESTNOSŤ<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('room');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter filter-color">
					        			FARBA<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('color');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter filter-design">
					        			DIZAJN<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('design');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        </div>
					      </div>
				  	  </div>

				  	  <div class="row">
						 <div class="col-sm-12 box box-color-11">
					        <div class="box-content-center">Lorem ipsum dolor sit amet, consec- tetuer adipiscing elit.</div>
					      </div>
				  	  </div>
		    	</div>
		    	<div class="col-md-8 col-sm-8 col-xs-12">
		    		<div class="row" id="inspiration-container"></div>
		    	</div>
		     </div>

		     <div class="row subpage" style="display:none;" id="blog">
		    	<div class="col-md-4 col-sm-4 col-xs-12">
		    		<div class="row">
			    		<div class="col-md-12 box box-color-7">
					        
					        <a href="" class="box-content box-content-center text-center homepage"><h1>Blog</h1></a>
					      </div>
					 </div>
					 <div class="row">
						 <div class="col-md-12 box box-color-10">
					        <div class="box-content filter-container">
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter-category">
					        			PRODUKT<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('category');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter-room">
					        			MIESTNOSŤ<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('room');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter-color">
					        			FARBA<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('color');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        	<div class="row filter-change">
					        		<div class="col-sm-6 filter-color">
					        			DIZAJN<small></small>
					        		</div>
					        		<div class="col-sm-6">
					        			<button class="btn-change" onClick="openFilterSelection('design');"><span class="icon-refresh"></span>Zmeniť</button>
					        		</div>
					        	</div>
					        </div>
					      </div>
				  	  </div>

				  	  <div class="row">
						 <div class="col-md-12 box box-color-11">
					        <div class="box-content-center">Lorem ipsum dolor sit amet, consec- tetuer adipiscing elit.</div>
					      </div>
				  	  </div>
		    	</div>
		    	<div class="col-md-8 col-sm-8 col-xs-12">
		    		<div class="row" id="blog-container"></div>
		    	</div>
		     </div>

		     <div class="row subpage" style="display:none;" id="blog-clanok">
			    <div class="col-md-4 col-sm-4 col-xs-12 box box box-color-7">
				    <a href="" class="box-content box-content-center text-center homepage"><h1 id="blog-name"></h1></a>
				</div>
				<div class="col-md-8 col-sm-8 col-xs-12 box box-color-half-9-10 box-image" id="blog-image">
				    <div class="box-content text-center"></div>
				</div>
				<div class="col-md-12 col-sm-12 col-xs-12 box box-color-third-10-11-9 triple-column">
				    <div class="box-content" id="blog-long-content"></div>
				</div>
				<div class="col-md-8 col-sm-8 col-xs-12 box box-color-half-11-9">
				    <div class="box-content" id="blog-short-content"></div>
				</div>
				<div class="col-md-4 col-sm-4 col-xs-12 box box box-color-10">
				    <div class="box-content">
				    	<div id="blog-inspire-image" class="box-image"></div>
				    	<button class="btn-inspiration btn-bottom" onClick="changePage('inspiracia','');" style="background-color: rgb(196, 28, 114);"><span class="icon-inspiration"></span>Inšpiruj sa</button>
				    </div>
				</div>
		     </div>

		    <div class="row subpage" style="display:none;" id="kontakt">
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-8">
		        
		        <a href="" class="box-content box-content-center text-center homepage"><h1>Kontakt</h1></a>
		      </div>
		      <div class="col-md-8 col-sm-8 col-xs-12 box box-color-half-9-10">
		        
		      </div>
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-10">
		      	
		      	<div class="box-content">
			        <h2>Lorem ipsum</h2>
			        <p>
			        	Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
			        </p>
			    </div>
		      </div>
		      <div class="col-md-8 col-sm-8 col-xs-12 box box-color-half-11-9">
		        <div id="googleMap" style="width:100%;height:80%;top:30px"></div>
		      </div>
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-11">
		        
		       <div class="box-content">
		        	<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
		        </div>
		       </div>
		       <div class="col-md-4 col-sm-4 col-xs-12 box box-color-9">
		        
		        <div class="box-content">
		        	<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
		        </div>
		       </div>
		      <div class="col-md-4 col-sm-4 col-xs-12 box box-color-10">
		        
		        <div class="box-content">
		        	<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
		        </div>
		       </div>
		    </div>
		</div>
	</div>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/inputspinner.js"></script>
    <script src="/js/simpleupload.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
	<script src="/js/script.js?v=<?=time();?>"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1fYBQxh3RG2F7Vy93aqMMgIDxIGLfF6U&callback=customMap"></script>
	
  </body>
</html>