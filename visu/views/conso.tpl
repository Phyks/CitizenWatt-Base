% include('_begin.tpl', title='Consommation', page='conso')

            <main>
                <div class="menu">
                    <h1><img alt="" src="{{ get_url('static', filename='img/data.svg') }}" />Consommation</h1>
                </div>
                <div id="overview">
                    <div>
                        <p id="now" class="blurry red"></p>
                        <p id="now_label">Consommation actuelle</p>
                    </div>
                    <!--
                    <div>
                        <p id="day" class="blurry orange">---kWh (---€)</p>
                        <p>Consommation totale</p>
                    </div>
                    <div>
                        <p id="week" class="blurry yellow">80W</p>
                        <p>Moyenne cette semaine</p>
                    </div>
                    -->
                </div>

                <div id="graph">
                    <div id="graph_values_wrapper">
                        <div id="graph_values"></div>
                    </div>
                    <div id="graph_vertical_axis"></div>
                    <hr style="bottom:33.3%"/>
                    <hr style="bottom:66.7%"/>
                </div>

                <nav id="scale">
                    <button id="scale-now" class="active">Maintenant</button>
                    <button id="scale-day">Aujourd'hui</button>
                    <button id="scale-week">Cette semaine</button>
                    <button id="scale-month">Ce mois</button>
                    <button id="toggle-unit">W/€</button>
                </nav>

                <p style="text-align: center;">{{ provider }}</p>
            </main>

<%
    scripts = [
        'conso/Menu',
        'conso/Graph',
        'conso/DataProvider',
        'conso/RateDisplay',
        'conso/App',
        'conso/Config',
        'conso/tail'
    ]
    include('_end.tpl', scripts=scripts)
%>

