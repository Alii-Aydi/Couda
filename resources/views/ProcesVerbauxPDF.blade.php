<!-- Import the JavaScript file -->
<script src="{{ asset('js/Utils/formatDate.js') }}"></script>

<div class="p-8 bg-white shadow-md space-y-4 flex flex-col"> <!-- Use a div with padding, background, and shadow -->
    <h1 class="text-xl font-bold">Procès-verbal de la {{ $committee->id }}e séance</h1>
    <p class="text-lg">Ministère des Finances, Tunisie</p>
    <!-- Use a span to hold the formatted date -->
    <p class="text-lg"><span id="formattedDate"></span>, {{ $committee->ouverture }}</p>
</div>

<script>
    // Call formatDate function after it's loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Get the date from PHP variable
        var committeeDate = {!! json_encode($committee->date) !!};

        // Format the date using formatDate function
        var formattedDate = formatDate(committeeDate);

        // Display the formatted date
        document.getElementById("formattedDate").textContent = formattedDate;
    });
</script>
<!-- Corrected $committee->ouverture -->
<hr /> <!-- Add a horizontal line between sections -->
<h2 class="text-lg font-bold">Présents :</h2>
<ul class="list-disc ml-6">
    @foreach ($members as $member)
        @if ($member->pivot->presence == 'present')
            <li class="text-sm">{{ $member->name }}</li>
        @endif
    @endforeach
</ul>
<hr />
<h2 class="text-lg font-bold">Absents :</h2>
<ul class="list-disc ml-6">
    @php
        $i = 0; // Initialize the absence counter
    @endphp
    @foreach ($members as $member)
        @if ($member->pivot->presence == 'absent')
            @php
                $i++; // Increment the absence counter
            @endphp
            <li class="text-sm">{{ $member->name }}</li>
        @endif
    @endforeach
    @if ($i == 0)
        <p class="italic text-gray-500">Aucune absence</p>
    @endif
</ul>
<hr />
<h2 class="text-lg font-bold">Ouverture de la séance :</h2>
<div class="flex">
    <p>La séance est ouverte à {{ $committee->ouverture }}, avec président(e) M. {{ $pv->presedent }}</p>
    <!-- Accessing 'president' from $pv -->
</div>
<p>{{ $pv->ouverture }}</p> <!-- Corrected $pv->ouverture -->
@foreach ($pv->customFields as $customField)
    <!-- Accessing custom fields through $pv -->
    <div class="mb-4">
        <h3 class="mt-2">Section N°{{ $loop->index + 1 }} :</h3> <!-- Using $loop to get index -->
        <p>Titre: {{ $customField->field_name }}</p>
        <p>Description: {{ $customField->field_value }}</p>
    </div>
@endforeach
<hr />
<h2 class="text-lg font-bold">Clôture de la séance :</h2>
<p>{{ $committee->cloture }}</p> <!-- Assuming 'cloture' is the committee's cloture attribute -->
<hr />
<div class="mt-auto self-end p-10">Signature</div>
</div>
