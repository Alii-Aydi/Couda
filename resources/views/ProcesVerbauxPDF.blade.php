<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Procès-verbal</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }

        .container {
            padding: 8px;
            background-color: white;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin: 0 auto;
            max-width: 800px;
        }

        .text-center {
            text-align: center;
        }

        .text-lg {
            font-size: 1.125rem;
        }

        .text-xl {
            font-size: 1.25rem;
        }

        .font-bold {
            font-weight: bold;
        }

        .list-disc {
            list-style-type: disc;
            margin-left: 1.5rem;
        }

        .italic {
            font-style: italic;
        }

        .text-gray-500 {
            color: #6B7280;
        }

        .mt-5 {
            margin-top: 1.25rem;
        }

        .p-10 {
            padding: 2.5rem;
        }

        .signature {
            text-align: right;
            padding-top: 2.5rem;
            margin-top: 1.25rem;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="text-center">
            <h1 class="text-xl font-bold">Procès-verbal de la {{ $committee->id }}e séance</h1>
            <p class="text-lg">Ministère des Finances, Tunisie</p>
            <p class="text-lg"><span id="formattedDate">{{ date('Y/m/d') }}</span></p>
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function() {
                var committeeDate = {!! json_encode($committee->date) !!};
                var formattedDate = formatDate(committeeDate);
                document.getElementById("formattedDate").textContent = formattedDate;
            });
        </script>

        <hr />
        <h3 class="text-lg font-bold">Présents :</h3>
        <ul class="list-disc">
            @foreach ($members as $member)
                @if ($member->pivot->presence == 'present')
                    <div class="justify-between w-1/2">
                        <li class="text-sm">{{ $member->name }}</li>
                        <span style="margin-left: 8px">
                            <?php
                            $filename = $member->signature_path;
                            $path = Storage::disk('private')->path($filename);
                            str_replace('\\', '/', $path);
                            $path = preg_replace('/private/', '', $path, 1);
                            Log::alert($path);
                            $data = file_get_contents($path);
                            $type = pathinfo($path, PATHINFO_EXTENSION);
                            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                            echo '<img src="' . $base64 . '" style="width:64px; height:32px;" alt="Signature of member">';
                            ?>
                        </span>
                    </div>
                @endif
            @endforeach
        </ul>

        <hr />
        <h3 class="text-lg font-bold">Absents :</h3>
        <ul class="list-disc">
            @php
                $i = 0;
            @endphp
            @foreach ($members as $member)
                @if ($member->pivot->presence == 'absent')
                    @php
                        $i++;
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
        <p>La séance est ouverte à {{ $committee->ouverture }}, avec président(e) M. {{ $pv->presedent }}</p>
        <p>{{ $pv->ouverture }}</p>
        @foreach ($pv->customFields as $customField)
            <div class="mb-4">
                <h3>{{ $customField->field_name }}</h3>
                <p>{{ $customField->field_value }}</p>
            </div>
        @endforeach

        <hr />
        <h3 class="text-lg font-bold">Clôture de la séance :</h3>
        <p>La séance est terminée à {{ $committee->cloture }}</p>
        <p>{{ $pv->cloture }}</p>

        <hr />
        <div class="signature">
            <div>Signature:</div>
            <?php
            $filename = $pv->president->signature_path;
            $path = Storage::disk('private')->path($filename);
            str_replace('\\', '/', $path);
            $path = preg_replace('/private/', '', $path, 1);
            Log::alert($path);
            $data = file_get_contents($path);
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            echo '<img src="' . $base64 . '" style="width:64px; height:32px;" alt="Signature of president">';
            ?>
        </div>
    </div>
</body>

</html>
